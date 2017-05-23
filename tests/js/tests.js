var $form = $('<form></form>');
var $input = $('<input id="input">');
var attribute = {
    input: '#input'
};
$form.append($input);

QUnit.test('The existence of methods', function (assert) {
    assert.strictEqual(typeof cetver, 'object', 'Object "cetver" exists');
    assert.strictEqual(typeof cetver.validationFilters, 'object', 'Object "cetver.validationFilters" exists');
    assert.strictEqual(
        typeof cetver.validationFilters.trim,
        'function',
        'Function "cetver.validationFilters.trim" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.ltrim,
        'function',
        'Function "cetver.validationFilters.ltrim" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.rtrim,
        'function',
        'Function "cetver.validationFilters.rtrim" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.mb_convert_case,
        'function',
        'Function "cetver.validationFilters.mb_convert_case" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.ucfirst,
        'function',
        'Function "cetver.validationFilters.ucfirst" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.lcfirst,
        'function',
        'Function "cetver.validationFilters.lcfirst" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.php,
        'object',
        'Object "cetver.validationFilters.php" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.php.trim,
        'function',
        'Function "cetver.validationFilters.php.trim" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.php.ltrim,
        'function',
        'Function "cetver.validationFilters.php.ltrim" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.php.rtrim,
        'function',
        'Function "cetver.validationFilters.php.rtrim" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.php.mb_convert_case,
        'function',
        'Function "cetver.validationFilters.php.mb_convert_case" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.php.ucfirst,
        'function',
        'Function "cetver.validationFilters.php.ucfirst" exists'
    );
    assert.strictEqual(
        typeof cetver.validationFilters.php.lcfirst,
        'function',
        'Function "cetver.validationFilters.php.lcfirst" exists'
    );
});

QUnit.test('trim', function (assert) {
    var options = {
        characterMask: ' \t\n\r\u0000\u000b'
    };

    $input.val(' hello world ');
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual($input.val(), 'hello world', '" hello world " -> "hello world"');

    $input.val(' привет мир ');
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual($input.val(), 'привет мир', '" привет мир " -> "привет мир"');

    $input.val(' \t\n\r\u0000\u000bhello world \t\n\r\u0000\u000b');
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual(
        $input.val(),
        'hello world',
        '" \\t\\n\\r\\u0000\\u000bhello world \\t\\n\\r\\u0000\\u000b" -> "hello world"'
    );

    $input.val('hello world');
    options.characterMask = 'helloworld';
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual($input.val(), ' ', '"hello world" -> " "');
});

QUnit.test('ltrim', function (assert) {
    var options = {
        characterMask: ' \t\n\r\u0000\u000b'
    };

    $input.val(' hello world');
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual($input.val(), 'hello world', '" hello world" -> "hello world"');

    $input.val(' привет мир');
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual($input.val(), 'привет мир', '" привет мир" -> "привет мир"');

    $input.val(' \t\n\r\u0000\u000bhello world');
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual(
        $input.val(),
        'hello world',
        '" \\t\\n\\r\\u0000\\u000bhello world" -> "hello world"'
    );

    $input.val('hello world');
    options.characterMask = 'hello';
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual($input.val(), ' world', '"hello world" -> " world"');
});

QUnit.test('rtrim', function (assert) {
    var options = {
        characterMask: ' \t\n\r\u0000\u000b'
    };

    $input.val('hello world ');
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual($input.val(), 'hello world', '"hello world " -> "hello world"');

    $input.val('привет мир ');
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual($input.val(), 'привет мир', '"привет мир " -> "привет мир"');

    $input.val('hello world \t\n\r\u0000\u000b');
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual(
        $input.val(),
        'hello world',
        '"hello world \\t\\n\\r\\u0000\\u000b" -> "hello world"'
    );

    $input.val('hello world');
    options.characterMask = 'world';
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual($input.val(), 'hello ', '"hello world" -> "hello "');
});

QUnit.test('mb_convert_case', function (assert) {
    var modes = {
        MB_CASE_UPPER: 0,
        MB_CASE_LOWER: 1,
        MB_CASE_TITLE: 2
    };
    var options = {
        mode: modes.MB_CASE_UPPER
    };
    $input.val('hello world');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'HELLO WORLD', '"hello world" -> "HELLO WORLD"');

    $input.val('привет мир');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'ПРИВЕТ МИР', '"привет мир" -> "ПРИВЕТ МИР"');

    options.mode = modes.MB_CASE_LOWER;

    $input.val('HELLO WORLD');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'hello world', '"HELLO WORLD" -> "hello world"');

    $input.val('ПРИВЕТ МИР');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'привет мир', '"ПРИВЕТ МИР" -> "привет мир"');

    options.mode = modes.MB_CASE_TITLE;

    $input.val('hello world');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'Hello World', '"hello world" -> "Hello World"');

    $input.val('HELLO WORLD');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'Hello World', '"HELLO WORLD" -> "Hello World"');

    $input.val('привет мир');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'Привет Мир', '"привет мир" -> "Привет Мир"');

    $input.val('ПРИВЕТ МИР');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($input.val(), 'Привет Мир', '"ПРИВЕТ МИР" -> "Привет Мир"');

    options.mode = 'invalid mode';
    assert.throws(
        function () {
            cetver.validationFilters.mb_convert_case($form, attribute, options);
        },
        new Error('The "mode" argument can have one of the following values: 0, 1, 2'),
        'Invalid mode exception'
    );
});

QUnit.test('ucfirst', function (assert) {
    $input.val('hello world');
    cetver.validationFilters.ucfirst($form, attribute);
    assert.strictEqual($input.val(), 'Hello world', '"hello world" -> "Hello world"');

    $input.val('привет мир');
    cetver.validationFilters.ucfirst($form, attribute);
    assert.strictEqual($input.val(), 'Привет мир', '"привет мир" -> "Привет мир"');
});

QUnit.test('lcfirst', function (assert) {
    $input.val('HELLO WORLD');
    cetver.validationFilters.lcfirst($form, attribute);
    assert.strictEqual($input.val(), 'hELLO WORLD', '"HELLO WORLD" -> "hELLO WORLD"');

    $input.val('ПРИВЕТ МИР');
    cetver.validationFilters.lcfirst($form, attribute);
    assert.strictEqual($input.val(), 'пРИВЕТ МИР', '"ПРИВЕТ МИР" -> "пРИВЕТ МИР"');
});