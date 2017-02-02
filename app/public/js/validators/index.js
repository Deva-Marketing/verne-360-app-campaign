/*jslint node:true, browser:true */
/*global $*/
'use strict';

module.exports = { };

module.exports.validateRequired = function (input) {
    // Retrieve row class
    var row = input.parents('.input-row');

    if (!input.is(':visible')) {
        return true;
    }

    // Check for blank value
    if (input.val() === '') {
        // Highlight field
        if (input.prop("tagName") === 'SELECT') {
            row.find('.select-wrapper').addClass('error');
        } else {
            input.addClass('error');
        }

        // Show error message
        row.find('span.error').show();
        row.find('span.error').removeClass('hidden');

        return false;
    }

    if (input.val() !== '') {
        // Remove highlight
        if (input.prop("tagName") === 'SELECT') {
            row.find('.select-wrapper').removeClass('error');
        } else {
            input.removeClass('error');
        }

        // Hide error message
        row.find('span.error').hide();
        row.find('span.error').removeClass('hidden');

        return true;
    }
};
module.exports.validateRequired.targetClass = 'validate-required';

/**
 * Function to validate a jQuery form field object reference against an email regex script.
 *
 * @param object input A jQuery form field object
 * @return boolean Result of validation check
 */
module.exports.validateEmail = function (input) {
    // Retrieve row class
    var row = input.parents('.input-row');

    // Check for valid email
    if (!(/^[a-zA-Z][\w\.\-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.\-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/.test(input.val().trim()))) {
        // Highlight field
        input.addClass('error');

        // Show error message
        row.find('span.error').show();
        row.find('span.error').removeClass('hidden');

        return false;
    }

    if ((/^[a-zA-Z][\w\.\-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.\-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/.test(input.val().trim()))) {
        // Remove highlight
        input.removeClass('error');

        // Hide error message
        row.find('span.error').hide();

        return true;
    }
};
module.exports.validateEmail.targetClass = 'validate-email';

module.exports.validateCheckbox = function (input) {
    // Retrieve row class
    var row = input.parents('.input-row');

    // Check for valid email
    if (!input.prop('checked')) {
         // Highlight field
        input.addClass('error');

        // Show error message
        row.find('span.error').show();
        row.find('span.error').removeClass('hidden');

        return false;
    }

    row.find('span.error').hide();

    return true;
};
module.exports.validateCheckbox.targetClass = 'validate-checkbox';
