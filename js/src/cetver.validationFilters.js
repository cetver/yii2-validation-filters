/**
 * Performs case folding on a string, converted in the way specified by mode.
 *
 * @param {string} str The string being converted.
 * @param {number} mode The mode of the conversion. It can be one of:
 * - 0: MB_CASE_UPPER
 * - 1: MB_CASE_LOWER
 * - 2: MB_CASE_TITLE
 *
 * @returns {string}
 */
function mb_convert_case(str, mode) {
    str += '';
    mode = Number(mode);
    switch (mode) {
        default:
            throw Error('The "mode" argument can have one of the following values: 0, 1, 2');
        case 0: // MB_CASE_UPPER
            return str.toUpperCase();
        case 1: // MB_CASE_LOWER
            return str.toLowerCase();
        case 2: // MB_CASE_TITLE
            return str.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
                return $1.toUpperCase();
            });
    }
}

module.exports.ltrim = require('../../vendor/npm-asset/locutus/php/strings/ltrim');
module.exports.trim = require('../../vendor/npm-asset/locutus/php/strings/trim');
module.exports.rtrim = require('../../vendor/npm-asset/locutus/php/strings/rtrim');
module.exports.ucfirst = require('../../vendor/npm-asset/locutus/php/strings/ucfirst');
module.exports.lcfirst = require('../../vendor/npm-asset/locutus/php/strings/lcfirst');
module.exports.mb_convert_case = mb_convert_case;
