Validation filters for Yii 2
============================
This extension provides a validation filters for the [Yii framework 2.0](http://www.yiiframework.com).

For license information check the [LICENSE](LICENSE)-file.

[![Build Status](https://travis-ci.org/cetver/yii2-validation-filters.svg?branch=master)](https://travis-ci.org/cetver/yii2-validation-filters)
[![Coverage Status](https://coveralls.io/repos/github/cetver/yii2-validation-filters/badge.svg?branch=master)](https://coveralls.io/github/cetver/yii2-validation-filters)

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
composer require --prefer-dist cetver/yii2-validation-filters
```

or add

```
"cetver/yii2-validation-filters": "~1.0.0"
```

to the require section of your `composer.json` file.


Usage
-----

### Available validation filters:

- [trim](#trim)
- [ltrim](#ltrim)
- [rtrim](#rtrim)
- [ucfirst](#ucfirst)
- [lcfirst](#lcfirst)
- [strtoupper](#strtoupper)
- [strtolower](#strtolower)
- [ucwords](#ucwords)
- [mb_convert_case](#mb_convert_case)

#### `trim`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\TrimValidator::className(),
            'characterMask' => ' ' // optional, default value is " \t\n\r\0\x0B"
        ],
    ];
}
```

#### `ltrim`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\LeftTrimValidator::className(),
            'characterMask' => ' ' // optional, default value is " \t\n\r\0\x0B"
        ],
    ];
}
```

#### `rtrim`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\RightTrimValidator::className(),
            'characterMask' => ' ' // optional, default value is " \t\n\r\0\x0B"
        ],
    ];
}
```

#### `ucfirst`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\MultibyteUpperCharacterFirstValidator::className(),
            'encoding' => 'UTF-8' // optional, default value is mb_internal_encoding()
        ],
    ];
}
```

#### `lcfirst`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\MultibyteLowerCharacterFirstValidator::className(),
            'encoding' => 'UTF-8' // optional, default value is mb_internal_encoding()
        ],
    ];
}
```

#### `strtoupper`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\MultibyteConvertCaseValidator::className(),
            'mode' => MB_CASE_UPPER,
            'encoding' => 'UTF-8' // optional, default value is mb_internal_encoding()
        ],
    ];
}
```

#### `strtolower`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\MultibyteConvertCaseValidator::className(),
            'mode' => MB_CASE_LOWER,
            'encoding' => 'UTF-8' // optional, default value is mb_internal_encoding()
        ],
    ];
}
```

#### `ucwords`

```php
public function rules()
{
    /**
    * NOTE:
    * ucwords('HELLO WORLD'); // HELLO WORLD
    * mb_convert_case('HELLO WORLD', MB_CASE_TITLE); // Hello World
    */
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\MultibyteConvertCaseValidator::className(),
            'mode' => MB_CASE_TITLE,
            'encoding' => 'UTF-8' // optional, default value is mb_internal_encoding()
        ],
    ];
}
```

#### `mb_convert_case`

```php
public function rules()
{
    return [
        [
            'attribute',
            \cetver\ValidationFilters\validators\MultibyteConvertCaseValidator::className(),
            /**
             * MB_CASE_UPPER - converts the attribute value uppercase.
             * MB_CASE_LOWER - converts the attribute value lowercase.
             * MB_CASE_TITLE - converts the first character of each word of the attribute value capitalized.
             */
            'mode' => MB_CASE_UPPER,
            'encoding' => 'UTF-8' // optional, default value is mb_internal_encoding()
        ],
    ];
}
```

Tests
-----

```
composer create-project --prefer-source cetver/yii2-validation-filters
```

### PHP
```
cd yii2-validation-filters
php vendor/bin/codecept run --config tests/php/codeception.yml unit
```

### JavaScript
Open in browser `yii2-validation-filters/tests/js/index.html`

or

```
cd yii2-validation-filters
npm install
npm run build
npm run test
```

Credits
-------

PHP functions written in JavaScript [locutus](https://github.com/kvz/locutus).

Browser-side require() the node.js way [browserify](https://github.com/substack/node-browserify).