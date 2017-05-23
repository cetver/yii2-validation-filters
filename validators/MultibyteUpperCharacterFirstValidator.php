<?php

namespace cetver\ValidationFilters\validators;

use cetver\ValidationFilters\assets\ValidationAsset;

/**
 * Class MultibyteUpperCharacterFirstValidator converts the attribute value according to the function
 *
 * @link http://php.net/ucfirst with multibyte support.
 */
class MultibyteUpperCharacterFirstValidator extends AbstractMultibyteValidator
{
    /**
     * @inheritdoc
     */
    public function clientValidateAttribute($model, $attribute, $view)
    {
        ValidationAsset::register($view);

        return 'value = cetver.validationFilters.ucfirst($form, attribute);';
    }

    /**
     * @inheritdoc
     */
    public function validateAttribute($model, $attribute)
    {
        $model->$attribute = $this->ucfirst($model->$attribute);
    }

    /**
     * Make a string's first character uppercase.
     *
     * @param string $str the input string.
     *
     * @return string the resulting string.
     */
    protected function ucfirst($str)
    {
        $firstCharacter = mb_strtoupper(
            mb_substr($str, 0, 1, $this->encoding),
            $this->encoding
        );
        $otherCharacters = mb_substr($str, 1, null, $this->encoding);

        return $firstCharacter . $otherCharacters;
    }
}