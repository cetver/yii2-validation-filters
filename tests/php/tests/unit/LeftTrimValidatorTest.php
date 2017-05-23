<?php

use cetver\ValidationFilters\assets\ValidationAsset;
use cetver\ValidationFilters\tests\php\tests\_data\FakedValidationModel;
use cetver\ValidationFilters\validators\LeftTrimValidator;
use yii\web\View;

class LeftTrimValidatorTest extends \Codeception\Test\Unit
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
        $validator = new LeftTrimValidator();

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
        $validator = new LeftTrimValidator();
        $view = new View([
            'assetBundles' => [
                ValidationAsset::className() => true,
            ],
        ]);

        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame(
            $js,
            'value = cetver.validationFilters.ltrim($form, attribute, {"characterMask":" \t\n\r\u0000\u000b"});'
        );

        $validator->characterMask = 'a';
        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame(
            $js,
            'value = cetver.validationFilters.ltrim($form, attribute, {"characterMask":"a"});'
        );
    }

    public function testValidateAttribute()
    {
        /**
         * @var $this PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();
        $validator = new LeftTrimValidator();

        $model->attr = ' hello world';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('hello world', $model->attr);

        $model->attr = ' привет мир';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('привет мир', $model->attr);

        $model->attr = " \t\n\r\0\x0B\t\n\r\0\x0Bhello world";
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('hello world', $model->attr);

        $model->attr = 'hello world';
        $validator->characterMask = 'hello';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame(' world', $model->attr);
    }
}