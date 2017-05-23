<?php

namespace cetver\ValidationFilters\validators;

use cetver\ValidationFilters\assets\ValidationAsset;
use yii\helpers\Json;

/**
 * Class RightTrimValidator converts the attribute value according to the function @link http://php.net/rtrim.
 */
class RightTrimValidator extends AbstractTrimValidator
{
    /**
     * @inheritdoc
     */
    public function validateAttribute($model, $attribute)
    {
        $model->$attribute = rtrim($model->$attribute, $this->characterMask);
    }

    /**
     * @inheritdoc
     */
    public function clientValidateAttribute($model, $attribute, $view)
    {
        ValidationAsset::register($view);
        $options = $this->getClientOptions($model, $attribute);

        return sprintf('value = cetver.validationFilters.rtrim($form, attribute, %s);', Json::encode($options));
    }
}