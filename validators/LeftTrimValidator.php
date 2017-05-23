<?php

namespace cetver\ValidationFilters\validators;

use cetver\ValidationFilters\assets\ValidationAsset;
use yii\helpers\Json;

/**
 * Class LeftTrimValidator converts the attribute value according to the function @link http://php.net/ltrim
 */
class LeftTrimValidator extends AbstractTrimValidator
{
    /**
     * @inheritdoc
     */
    public function validateAttribute($model, $attribute)
    {
        $model->$attribute = ltrim($model->$attribute, $this->characterMask);
    }

    /**
     * @inheritdoc
     */
    public function clientValidateAttribute($model, $attribute, $view)
    {
        ValidationAsset::register($view);
        $options = $this->getClientOptions($model, $attribute);

        return sprintf('value = cetver.validationFilters.ltrim($form, attribute, %s);', Json::encode($options));
    }
}