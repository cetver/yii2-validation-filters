(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.cetver||(g.cetver = {}));g=(g.validationFilters||(g.validationFilters = {}));g.php = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../../vendor/npm-asset/locutus/php/strings/lcfirst":2,"../../vendor/npm-asset/locutus/php/strings/ltrim":3,"../../vendor/npm-asset/locutus/php/strings/rtrim":4,"../../vendor/npm-asset/locutus/php/strings/trim":5,"../../vendor/npm-asset/locutus/php/strings/ucfirst":6}],2:[function(require,module,exports){
'use strict';

module.exports = function lcfirst(str) {
  //  discuss at: http://locutus.io/php/lcfirst/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: lcfirst('Kevin Van Zonneveld')
  //   returns 1: 'kevin Van Zonneveld'

  str += '';
  var f = str.charAt(0).toLowerCase();
  return f + str.substr(1);
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function ltrim(str, charlist) {
  //  discuss at: http://locutus.io/php/ltrim/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Erkekjetter
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: ltrim('    Kevin van Zonneveld    ')
  //   returns 1: 'Kevin van Zonneveld    '

  charlist = !charlist ? ' \\s\xA0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');

  var re = new RegExp('^[' + charlist + ']+', 'g');

  return (str + '').replace(re, '');
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function rtrim(str, charlist) {
  //  discuss at: http://locutus.io/php/rtrim/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Erkekjetter
  //    input by: rem
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: rtrim('    Kevin van Zonneveld    ')
  //   returns 1: '    Kevin van Zonneveld'

  charlist = !charlist ? ' \\s\xA0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1');

  var re = new RegExp('[' + charlist + ']+$', 'g');

  return (str + '').replace(re, '');
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function trim(str, charlist) {
  //  discuss at: http://locutus.io/php/trim/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: mdsjack (http://www.mdsjack.bo.it)
  // improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Steven Levithan (http://blog.stevenlevithan.com)
  // improved by: Jack
  //    input by: Erkekjetter
  //    input by: DxGx
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: trim('    Kevin van Zonneveld    ')
  //   returns 1: 'Kevin van Zonneveld'
  //   example 2: trim('Hello World', 'Hdle')
  //   returns 2: 'o Wor'
  //   example 3: trim(16, 1)
  //   returns 3: '6'

  var whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A', '\u200B', '\u2028', '\u2029', '\u3000'].join('');
  var l = 0;
  var i = 0;
  str += '';

  if (charlist) {
    whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
  }

  l = str.length;
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }

  l = str.length;
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function ucfirst(str) {
  //  discuss at: http://locutus.io/php/ucfirst/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: ucfirst('kevin van zonneveld')
  //   returns 1: 'Kevin van zonneveld'

  str += '';
  var f = str.charAt(0).toUpperCase();
  return f + str.substr(1);
};

},{}]},{},[1])(1)
});

(function ($) {
    function getInputValue($form, attribute, callback) {
        var $input = $form.find(attribute.input);
        var value = $input.val();
        value = callback(value);
        $input.val(value);
        return value;
    }

    var php = cetver.validationFilters.php;

    $.extend(cetver.validationFilters, {
        trim: function ($form, attribute, options) {
            return getInputValue($form, attribute, function (value) {
                return php.trim(value, options.characterMask);
            });
        },
        ltrim: function ($form, attribute, options) {
            return getInputValue($form, attribute, function (value) {
                return php.ltrim(value, options.characterMask);
            });
        },
        rtrim: function ($form, attribute, options) {
            return getInputValue($form, attribute, function (value) {
                return php.rtrim(value, options.characterMask);
            });
        },
        mb_convert_case: function ($form, attribute, options) {
            return getInputValue($form, attribute, function (value) {
                return php.mb_convert_case(value, options.mode);
            });
        },
        ucfirst: function ($form, attribute) {
            return getInputValue($form, attribute, function (value) {
                return php.ucfirst(value);
            });
        },
        lcfirst: function ($form, attribute) {
            return getInputValue($form, attribute, function (value) {
                return php.lcfirst(value);
            });
        }
    });
})(jQuery);
