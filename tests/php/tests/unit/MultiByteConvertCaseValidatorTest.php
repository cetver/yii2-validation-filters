<?php

use cetver\ValidationFilters\assets\ValidationAsset;
use cetver\ValidationFilters\tests\php\tests\_data\FakedValidationModel;
use cetver\ValidationFilters\validators\MultibyteConvertCaseValidator;
use yii\web\View;

class MultiByteConvertCaseValidatorTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;

    public function testGetEncodingsAsString()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $this->assertSame(MultibyteConvertCaseValidator::getEncodingsAsString(), implode(', ', mb_list_encodings()));
    }

    public function testSetEncodingOnInit()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_UPPER,
        ]);
        $this->assertSame($validator->encoding, mb_internal_encoding());
    }

    public function testAssureEncodingExceptionOnInit()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $this->setExpectedException('yii\base\InvalidConfigException', sprintf(
            'The "encoding" property can have one of the following values: %s',
            MultibyteConvertCaseValidator::getEncodingsAsString()
        ));
        new MultibyteConvertCaseValidator([
            'mode'     => MB_CASE_UPPER,
            'encoding' => uniqid(),
        ]);
    }

    public function testGetModesAsString()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $this->assertSame(MultibyteConvertCaseValidator::getModesAsString(), '0, 1, 2');
    }

    public function testAssureModeExceptionOnInit()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $this->setExpectedException('yii\base\InvalidConfigException', sprintf(
            'The "mode" property can have one of the following values: %s',
            MultibyteConvertCaseValidator::getModesAsString()
        ));
        new MultibyteConvertCaseValidator();
    }

    public function testClientOptions()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_UPPER,
        ]);
        $this->assertSame($validator->getClientOptions($model, 'attr'), [
            'mode' => 0,
        ]);

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_LOWER,
        ]);
        $this->assertSame($validator->getClientOptions($model, 'attr'), [
            'mode' => 1,
        ]);

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_TITLE,
        ]);
        $this->assertSame($validator->getClientOptions($model, 'attr'), [
            'mode' => 2,
        ]);
    }

    public function testClientValidateAttribute()
    {
        /**
         * @var $this PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();
        $view = new View([
            'assetBundles' => [
                ValidationAsset::className() => true,
            ],
        ]);

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_UPPER,
        ]);
        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame(
            $js,
            'value = cetver.validationFilters.mb_convert_case($form, attribute, {"mode":0});'
        );

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_LOWER,
        ]);
        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame(
            $js,
            'value = cetver.validationFilters.mb_convert_case($form, attribute, {"mode":1});'
        );

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_TITLE,
        ]);
        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame(
            $js,
            'value = cetver.validationFilters.mb_convert_case($form, attribute, {"mode":2});'
        );
    }

    public function testValidateAttribute()
    {
        /**
         * @var $this PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_UPPER,
        ]);
        $model->attr = 'hello world';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('HELLO WORLD', $model->attr);

        $model->attr = 'привет мир';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('ПРИВЕТ МИР', $model->attr);

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_LOWER,
        ]);
        $model->attr = 'HELLO WORLD';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('hello world', $model->attr);

        $model->attr = 'ПРИВЕТ МИР';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('привет мир', $model->attr);

        $validator = new MultibyteConvertCaseValidator([
            'mode' => MB_CASE_TITLE,
        ]);
        $model->attr = 'hello world';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('Hello World', $model->attr);

        $model->attr = 'HELLO WORLD';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('Hello World', $model->attr);

        $model->attr = 'привет мир';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('Привет Мир', $model->attr);

        $model->attr = 'ПРИВЕТ МИР';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('Привет Мир', $model->attr);
    }
}