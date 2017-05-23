<?php

namespace cetver\ValidationFilters\validators;

use cetver\ValidationFilters\assets\ValidationAsset;
use yii\helpers\Json;

/**
 * Class TrimValidator converts the attribute value according to the function @link http://php.net/trim
 * Unlike the built in trim validator, it supports @see $characterMask
 */
class TrimValidator extends AbstractTrimValidator
{
    /**
     * @inheritdoc
     */
    public function validateAttribute($model, $attribute)
    {
        $model->$attribute = trim($model->$attribute, $this->characterMask);
    }

    /**
     * @inheritdoc
     */
    public function clientValidateAttribute($model, $attribute, $view)
    {
        ValidationAsset::register($view);
        $options = $this->getClientOptions($model, $attribute);

        return sprintf('value = cetver.validationFilters.trim($form, attribute, %s);', Json::encode($options));
    }
}