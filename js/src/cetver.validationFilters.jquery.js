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
