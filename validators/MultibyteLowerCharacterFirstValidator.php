<?php

namespace cetver\ValidationFilters\validators;

use cetver\ValidationFilters\assets\ValidationAsset;

/**
 * Class MultibyteLowerCharacterFirstValidator converts the attribute value according to the function
 * @link http://php.net/lcfirst with multibyte support.
 */
class MultibyteLowerCharacterFirstValidator extends AbstractMultibyteValidator
{
    /**
     * @inheritdoc
     */
    public function clientValidateAttribute($model, $attribute, $view)
    {
        ValidationAsset::register($view);

        return 'value = cetver.validationFilters.lcfirst($form, attribute);';
    }

    /**
     * @inheritdoc
     */
    public function validateAttribute($model, $attribute)
    {
        $model->$attribute = $this->lcfirst($model->$attribute);
    }

    /**
     * Make a string's first character lowercase.
     *
     * @param string $str the input string.
     *
     * @return string the resulting string.
     */
    protected function lcfirst($str)
    {
        $firstCharacter = mb_strtolower(
            mb_substr($str, 0, 1, $this->encoding),
            $this->encoding
        );
        $otherCharacters = mb_substr($str, 1, null, $this->encoding);

        return $firstCharacter . $otherCharacters;
    }
}