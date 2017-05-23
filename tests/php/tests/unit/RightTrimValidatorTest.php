<?php

use cetver\ValidationFilters\assets\ValidationAsset;
use cetver\ValidationFilters\tests\php\tests\_data\FakedValidationModel;
use cetver\ValidationFilters\validators\RightTrimValidator;
use yii\web\View;

class RightTrimValidatorTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;

    public function testGetClientOptions()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();
        $validator = new RightTrimValidator();

        $this->assertSame($validator->getClientOptions($model, 'attr'), [
            'characterMask' => " \t\n\r\0\x0B",
        ]);

        $validator->characterMask = 'a';
        $this->assertSame($validator->getClientOptions($model, 'attr'), [
            'characterMask' => 'a',
        ]);
    }

    public function testClientValidateAttribute()
    {
        /**
         * @var $this PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();
        $validator = new RightTrimValidator();
        $view = new View([
            'assetBundles' => [
                ValidationAsset::className() => true,
            ],
        ]);

        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame(
            $js,
            'value = cetver.validationFilters.rtrim($form, attribute, {"characterMask":" \t\n\r\u0000\u000b"});'
        );

        $validator->characterMask = 'a';
        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame(
            $js,
            'value = cetver.validationFilters.rtrim($form, attribute, {"characterMask":"a"});'
        );
    }

    public function testValidateAttribute()
    {
        /**
         * @var $this PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();
        $validator = new RightTrimValidator();

        $model->attr = 'hello world ';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('hello world', $model->attr);

        $model->attr = 'привет мир ';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('привет мир', $model->attr);

        $model->attr = "hello world \t\n\r\0\x0B\t\n\r\0\x0B";
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('hello world', $model->attr);

        $model->attr = 'hello world';
        $validator->characterMask = 'world';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('hello ', $model->attr);
    }
}