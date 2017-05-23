<?php

use cetver\ValidationFilters\assets\ValidationAsset;
use cetver\ValidationFilters\tests\php\tests\_data\FakedValidationModel;
use cetver\ValidationFilters\validators\MultibyteLowerCharacterFirstValidator;
use yii\web\View;

class MultiByteLowerCharacterFirstValidatorTest extends \Codeception\Test\Unit
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
        $this->assertSame(MultibyteLowerCharacterFirstValidator::getEncodingsAsString(), implode(', ', mb_list_encodings()));
    }

    public function testSetEncodingOnInit()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $validator = new MultibyteLowerCharacterFirstValidator();
        $this->assertSame($validator->encoding, mb_internal_encoding());
    }

    public function testAssureEncodingExceptionOnInit()
    {
        /**
         * @var $this \PHPUnit_Framework_TestCase
         */
        $this->setExpectedException('yii\base\InvalidConfigException', sprintf(
            'The "encoding" property can have one of the following values: %s',
            MultibyteLowerCharacterFirstValidator::getEncodingsAsString()
        ));
        new MultibyteLowerCharacterFirstValidator([
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
        $validator = new MultibyteLowerCharacterFirstValidator();
        $js = $validator->clientValidateAttribute($model, $validator, $view);
        $this->assertSame($js, 'value = cetver.validationFilters.lcfirst($form, attribute);');
    }

    public function testValidateAttribute()
    {
        /**
         * @var $this PHPUnit_Framework_TestCase
         */
        $model = new FakedValidationModel();
        $validator = new MultibyteLowerCharacterFirstValidator();

        $model->attr = 'HELLO WORLD';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('hELLO WORLD', $model->attr);

        $model->attr = 'ПРИВЕТ МИР';
        $validator->validateAttribute($model, 'attr');
        $this->assertSame('пРИВЕТ МИР', $model->attr);
    }
}