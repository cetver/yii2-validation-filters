<?php

namespace cetver\ValidationFilters\validators;

use cetver\ValidationFilters\assets\ValidationAsset;
use yii\base\InvalidConfigException;
use yii\helpers\Json;

/**
 * Class MultibyteConvertCaseValidator converts the attribute value according to the function
 * @link http://php.net/mb_convert_case
 */
class MultibyteConvertCaseValidator extends AbstractMultibyteValidator
{
    /**
     * @var int the mode of the conversion. It can be one of:
     * - `MB_CASE_UPPER`: converts the attribute value uppercase.
     * - `MB_CASE_LOWER`: converts the attribute value lowercase.
     * - `MB_CASE_TITLE`: converts the first character of each word of the attribute value capitalized.
     */
    public $mode;

    /**
     * @inheritdoc
     */
    public function init()
    {
        if (!in_array($this->mode, $this->getModes(), true)) {
            throw new InvalidConfigException(sprintf(
                'The "mode" property can have one of the following values: %s',
                static::getModesAsString()
            ));
        }
        parent::init();
    }

    /**
     * @inheritdoc
     */
    public function getClientOptions($model, $attribute)
    {
        return [
            'mode' => $this->mode,
        ];
    }

    /**
     * @inheritdoc
     */
    public function clientValidateAttribute($model, $attribute, $view)
    {
        ValidationAsset::register($view);
        $options = $this->getClientOptions($model, $attribute);

        return sprintf('value = cetver.validationFilters.mb_convert_case($form, attribute, %s);', Json::encode($options));
    }

    /**
     * @inheritdoc
     */
    public function validateAttribute($model, $attribute)
    {
        $model->$attribute = mb_convert_case($model->$attribute, $this->mode, $this->encoding);
    }

    /**
     * Returns available values for @see $mode as comma separated list.
     *
     * @return string
     */
    public static function getModesAsString()
    {
        return implode(', ', static::getModes());
    }

    /**
     * Returns available values for @see $mode as array.
     *
     * @return array
     */
    private static function getModes()
    {
        return [
            MB_CASE_UPPER,
            MB_CASE_LOWER,
            MB_CASE_TITLE,
        ];
    }
}