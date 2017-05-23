<?php

namespace cetver\ValidationFilters\validators;

use yii\validators\Validator;

/**
 * Class AbstractTrimValidator is the base class for trim validators.
 */
abstract class AbstractTrimValidator extends Validator
{
    /**
     * @var string The list of characters to trim.
     */
    public $characterMask = " \t\n\r\0\x0B";

    /**
     * @inheritdoc
     */
    public function getClientOptions($model, $attribute)
    {
        return [
            'characterMask' => $this->characterMask,
        ];
    }
}