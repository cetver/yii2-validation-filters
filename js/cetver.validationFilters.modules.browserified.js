(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.cetver||(g.cetver = {}));g=(g.validationFilters||(g.validationFilters = {}));g.php = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            return str.toUpperCase();
        case 1: // MB_CASE_LOWER
            return str.toLowerCase();
        case 2: // MB_CASE_TITLE
            return str.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
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

},{"../../../npm/locutus/php/strings/lcfirst":2,"../../../npm/locutus/php/strings/ltrim":3,"../../../npm/locutus/php/strings/rtrim":4,"../../../npm/locutus/php/strings/trim":5,"../../../npm/locutus/php/strings/ucfirst":6}],2:[function(require,module,exports){
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