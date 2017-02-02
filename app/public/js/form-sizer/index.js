/*jslint node:true, browser:true */
/*global $, IN*/
'use strict';

var obj = {};

obj.setBoxSizes = function (config) {
    // Set box heights
    var formHeight = 0,
        pages = config.pages,
        container = config.container;

    pages.forEach(function (page) {
        if ($(page).outerHeight() > formHeight) {
            formHeight = $(page).outerHeight();
        }
    });

    $(container).height(formHeight);
};

module.exports = obj;
