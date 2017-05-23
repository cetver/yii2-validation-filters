<?php

use cetver\ValidationFilters\assets\ValidationAsset;
use cetver\ValidationFilters\tests\php\tests\_data\FakedValidationModel;
use cetver\ValidationFilters\validators\MultibyteUpperCharacterFirstValidator;
use yii\web\View;

class MultiByteUpperCharacterFirstValidatorTest extends \Codeception\Test\Unit
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
        $this->assertSame(MultibyteUpperCharacterFirstValidator::getEncodingsAsString(), implode(', ', mb_list_encodings()));
    }

    public function testSetEncodingOnInit()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $validator = new MultibyteUpperCharacterFirstValidator();
        $this->assertSame($validator->encoding, mb_internal_encoding());
    }

    public function testAssureEncodingExceptionOnInit()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $this->setExpectedException('yii\base\InvalidConfigException', sprintf(
            'The "encoding" property can have one of the following values: %s',
            MultibyteUpperCharacterFirstValidator::getEncodingsAsString()
        ));
        new MultibyteUpperCharacterFirstValidator([
            'encoding' => uniqid(),
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
        $validator = new MultibyteUpperCharacterFirstValidator();
        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame($js, 'value = cetver.validationFilters.ucfirst($form, attribute);');
    }

    public function testValidateAttribute()
    {
        /**
         * @var $this PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();
        $validator = new MultibyteUpperCharacterFirstValidator();

        $model->attr = 'hello world';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('Hello world', $model->attr);

        $model->attr = 'привет мир';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('Привет мир', $model->attr);
    }
}