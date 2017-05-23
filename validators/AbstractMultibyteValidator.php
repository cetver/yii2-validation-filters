<?php

namespace cetver\ValidationFilters\validators;

use yii\base\InvalidConfigException;
use yii\validators\Validator;

/**
 * Class AbstractMultibyteValidator is the base class for multibyte validators.
 */
abstract class AbstractMultibyteValidator extends Validator
{
    /**
     * @var string the character encoding, if it is omitted, the internal character encoding value will be used.
     * Can take one of the values returned by the function @link http://php.net/mb_list_encodings
     */
    public $encoding;

    /**
     * @inheritdoc
     */
    public function init()
    {
        if ($this->encoding === null) {
            $this->encoding = mb_internal_encoding();
        }
        if (!in_array($this->encoding, mb_list_encodings(), true)) {
            throw new InvalidConfigException(sprintf(
                'The "encoding" property can have one of the following values: %s',
                static::getEncodingsAsString()
            ));
        }
        parent::init();
    }

    /**
     * Returns available encodings for @see $encoding as comma separated list.
     *
     * @return string
     */
    public static function getEncodingsAsString()
    {
        return implode(', ', mb_list_encodings());
    }
}