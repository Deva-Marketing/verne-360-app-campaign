/*jslint node:true, browser:true */
/*global $, addthis*/
'use strict';

/**
 * The localisations parameter should be in the following format:
 * {
 *     "<LANGUAGE>": {
 *         uiLanguage: "<UI_LANGUAGE>", // Get this from http://support.addthis.com/customer/portal/articles/381240-languages
 *         title: "<TITLE>",
 *         url: "<URL>",
 *         description: "<DESCRIPTION>"
 *     }
 * }
 * @param {Object}  localisations
 * @param {string}  gaId                     Google Analytics ID
 * @param {string}  twitterUsername          Twitter name to associate tweet with.
 * @param {string}  [language]               Defaults to HTML's lang attribute.
 * @param {boolean} [defaultToEnglish=false] When the localisation isn't found, use english?
 */
module.exports = function (localisations, gaId, twitterUsername, language, defaultToEnglish) {
    if (!language) {
        language = document.documentElement.getAttribute('lang');
    }

    var localised = localisations[language];

    if (!localised && defaultToEnglish) {
        localised = localisations.en;
        if (!localised) {
            localised = localisations['en-GB'];
        }
    }

    if (!localised) {
        return;
    }

    window.addthis_config = {
        "data_track_addressbar": true,
        "data_track_clickback": true,
        data_ga_property: gaId,
        data_ga_social: true,
        ui_language: localised.uiLanguage
    };
    window.addthis_share = {
        passthrough: {
            twitter: {
                via: twitterUsername,
                text: localised.title
            }
        },
        url: localised.url,
        title: localised.title,
        description: localised.description
    };

    addthis.layers({
        'theme': 'dark',
        'share': {
            'position': 'left',
            'services': 'facebook,linkedin,twitter,google_plusone_share,more',
            'postShareRecommendedMsg': ''
        }
    });
};
