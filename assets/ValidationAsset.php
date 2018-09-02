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
    public $sourcePath = '@cetver/ValidationFilters/js/dist';
    /**
     * @inheritdoc
     */
    public $js = ['cetver.validationFilters.min.js'];
    /**
     * @inheritdoc
     */
    public $depends = ['yii\validators\ValidationAsset'];
}