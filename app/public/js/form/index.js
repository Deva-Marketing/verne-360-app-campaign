/*jslint node:true, browser:true */
/*global $*/
'use strict';

var obj = {},
    validators = require('../validators'),
    form = require('../form-sizer'),
    formInvalid = null;

// default obj variables - editable in main js (formSizer for if setBoxSizes should run)(progressContainer incase className changes)(ajax for how the form submits)
obj.formSizer = true;
obj.progressContainer = 'form-progress';
obj.formSizerConfig = { 'container': '.forms-container', 'pages': ['.form1', '.form2', '.form3'] };

// validates an array of field objects
function validate(fields) {
    var valid = true;

    fields.forEach(function (field) {
        // defaults
        var validator = 'validateRequired',
            input = field.type + '[name="' + field.name + '"]';
        // check if options are supplied
        if (field.options) {
            // if 'email'/'checkbox' is supplied, change validator to email/checkbox
            if (field.options.indexOf('email') > -1) {
                validator = 'validateEmail';
            } else if (field.options.indexOf('checkbox') > -1) {
                validator = 'validateCheckbox';
            } else if (field.options.indexOf('subSelect') > -1) {
                input = field.wrapper + ' > ' + input;
            }
        }
        if (!validators[validator]($(input))) {
            // Check is first
            if (formInvalid === null) {
                formInvalid = $(input);
                if (field.type === 'select') { formInvalid = $(input).parent(); }
            }
            valid = false;
        }
    });
    return valid;
}

// resize boxes if formSizer is true
function boxSize() {
    if (obj.formSizer) {
        form.setBoxSizes(obj.formSizerConfig);
    }
}

// initializes keyUp listeners for fields that require validation
function listeners() {
    Object.keys(validators).forEach(function (validatorName) {
        var validator = validators[validatorName];
        $('.' + validator.targetClass).bind("change keyup blur", function () {
            // Validate required input
            validator($(this));
            boxSize();
        });
    });
}

// switches form, taking class names for 'current' and 'next' as strings
function switchForm(current, next) {
    $('.' + current).fadeOut(250, function () {
        $('.' + next).fadeIn(250);
        $('.' + next).removeClass('hidden');

        // Scroll to top of form
        $('html, body').animate({
            scrollTop: $('#form').offset().top
        }, 750);
    });
}

// scrolls to the top invalid field
function invalidScroll() {
    $('html, body').animate({
        scrollTop: formInvalid.offset().top
    }, 750);
}

obj.settings = function (config) {
    Object.getOwnPropertyNames(config).forEach(function (setting) {
        obj[setting] = Object.getOwnPropertyDescriptor(config, setting).value;
    });
    console.log(obj);
};

// init a next button, params: (string)btnName, (array of objects)fields, (object)current, (object)next
// each field expects: 'type' and 'name'. 'options' is optional and expects an array.
// current and next expects: 'form' and 'progress' (these are class names of the current/next form/progress level)
obj.initNext = function (btnName, fields, current, next) {
    $('input[name="' + btnName + '"]').click(function (event) {
        // Prevent default action
        event.preventDefault();

        // Reset first invalid element
        formInvalid = null;

        // Validate form
        var valid = validate(fields);

        if (valid) {
            // Update progress
            $('.' + obj.progressContainer + ' .' + current.progress).addClass('complete');
            $('.' + obj.progressContainer + ' .' + next.progress).removeClass('complete');
            $('.' + obj.progressContainer + ' .' + next.progress).addClass('during');

            // Show next form
            switchForm(current.form, next.form);
        } else if (formInvalid !== null) {
            invalidScroll();
        }
    });
};

// init a back button, params: (string)btnName, (object)current, (object)previous
// current and previous expects: 'form' and 'progress' (these are class names of the current/previous form/progress level)
obj.initBack = function (btnName, current, previous) {
    $('input[name="' + btnName + '"]').click(function (event) {
        // Prevent default action
        event.preventDefault();

        // Update progress
        $('.' + obj.progressContainer + ' .' + current.progress).removeClass('during');
        $('.' + obj.progressContainer + ' .' + previous.progress).removeClass('complete');
        $('.' + obj.progressContainer + ' .' + previous.progress).addClass('during');

        // Show prev form
        switchForm(current.form, previous.form);
    });
};

// init a submit button, params: (string)btnName, (array of objects)fields, Optional:: (object)ajax
// each field expects: 'type' and 'name'. 'options' is optional and expects an array.
// ajax is optional, for ajax submition, expects object containing currentForm, thanksForm, waitTxt and progress.
obj.initSubmit = function (btnName, fields, ajax) {
    $('input[name="' + btnName + '"]').click(function (event) {
        // Prevent default action
        event.preventDefault();

        // Reset first invalid element
        formInvalid = null;

        // validate form
        var valid = validate(fields);

        if (valid) {
            $('input[name="' + btnName + '"]').prop('disabled', true);
            if (!ajax) {
                // normal submit
                $('#verne-form').submit();
            } else {
                // ajax submit
                $('input[name="' + btnName + '"]').val(ajax.waitTxt);
                $.post($('#verne-form').attr('action'), $('form').serialize(),
                    function () {
                        // Show thanks
                        $('.' + ajax.currentForm).fadeOut(250, function () {
                            $('.' + ajax.thanksForm).fadeIn(250);

                            // Scroll to top of form
                            $('html, body').animate({
                                scrollTop: $('#form').offset().top
                            }, 750);
                        });
                    }, "json");
                // Update progress
                $('.' + obj.progressContainer + '.' + ajax.progress).addClass('complete');
            }
        } else if (formInvalid !== null) {
            invalidScroll();
        }
    });
};

// init a sub select, params (string)parentSelectName, (string)subSelect Wrapper, (array of object)SubMenus, containing 'wrapper' & 'value'
obj.addSubSelect = function (name, subWrapper, cases) {
    $('select[name="' + name + '"]').change(function () {
        var found = false,
            value = $(this).val();

        cases.forEach(function (cas) {
            $(cas.wrapper).hide();
            $(cas.wrapper + " > select").prop('disabled', true);
            if (value === cas.value) {
                found = true;
                $(cas.wrapper + " > select").prop('disabled', false);
                $(cas.wrapper).show();
                $(subWrapper).slideDown('fast', function () {
                    boxSize();
                });
            }
        });
        if (!found) {
            $(subWrapper).slideUp('fast', function () {
                boxSize();
            });
        }
    });
};

// add listeners and run setBoxSizes on load
(function () {
    listeners();
    boxSize();
}());

module.exports = obj;
