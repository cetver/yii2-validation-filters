/**
 * Command for generation browserified file:
 * browserify cetver.validationFilters.modules.js --standalone cetver.validationFilters.php --outfile cetver.validationFilters.modules.browserified.js
 */

function mb_convert_case(str, mode) {
    str += '';
    mode = Number(mode);
    switch (mode) {
        default:
            throw Error('The "mode" argument can have one of the following values: 0, 1, 2');
        case 0: // MB_CASE_UPPER
            var strtoupper = require('../../../npm/locutus/php/strings/strtoupper');
            return strtoupper(str);
        case 1: // MB_CASE_LOWER
            var strtolower = require('../../../npm/locutus/php/strings/strtolower');
            return strtolower(str);
        case 2: // MB_CASE_TITLE
            return str.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) {
                return $1.toUpperCase();
            });
    }
}

module.exports.ltrim = require('../../../npm/locutus/php/strings/ltrim');
module.exports.trim = require('../../../npm/locutus/php/strings/trim');
module.exports.rtrim = require('../../../npm/locutus/php/strings/rtrim');
module.exports.ucfirst = require('../../../npm/locutus/php/strings/ucfirst');
module.exports.lcfirst = require('../../../npm/locutus/php/strings/lcfirst');
module.exports.mb_convert_case = mb_convert_case;
