<?php

namespace cetver\ValidationFilters\assets;

use yii\web\AssetBundle;

/**
 * Class ValidationAsset provides the javascript files for client validation.
 */
class ValidationAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public $sourcePath = '@cetver/ValidationFilters/js';
    /**
     * @inheritdoc
     */
    public $js = [
        'cetver.validationFilters.modules.browserified.js',
        'cetver.validationFilters.validation.js',
    ];
    /**
     * @inheritdoc
     */
    public $depends = [
        'yii\validators\ValidationAsset',
    ];
}