/*jslint node:true, browser:true */
'use strict';

var $ = require('jquery');
window.$ = $;
window.jQuery = $;

// Foundation
require('foundation');
require('foundation/js/foundation/foundation.reveal.js'); // for video modal

$(document).foundation();

// Form
// var form = require('./form');

// form.initSubmit('formSubmit', [
//     {'type': 'input', 'name': 'fullname'},
//     {'type': 'input', 'name': 'email'},
//     {'type': 'input', 'name': 'company'}
// ]);

// DE - Opt-in
// $('input[name="thanks_opt_in"]').change(function (event) {
//     // Prevent default action
//     event.preventDefault();

//     if (this.checked) {
//         // Redirect to confirmation page
//         window.location.href = $(this).val();
//     }
// });

// iFrame resize
//require('iframe-resizer');
//$('#pardot-signup', '.pardot-form').iFrameResize();
