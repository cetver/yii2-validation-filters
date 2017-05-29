var $form = $('<form></form>');
var $textarea = $('<textarea id="textarea"></textarea>');
var attribute = {
    input: '#textarea'
};
$form.append($textarea);

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

    $textarea.val(' hello world ');
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual($textarea.val(), 'hello world', '" hello world " -> "hello world"');

    $textarea.val(' привет мир ');
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual($textarea.val(), 'привет мир', '" привет мир " -> "привет мир"');

    $textarea.val(' \t\n\r\u0000\u000bhello world \t\n\r\u0000\u000b');
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual(
        $textarea.val(),
        'hello world',
        '" \\t\\n\\r\\u0000\\u000bhello world \\t\\n\\r\\u0000\\u000b" -> "hello world"'
    );

    $textarea.val('hello world');
    options.characterMask = 'helloworld';
    cetver.validationFilters.trim($form, attribute, options);
    assert.strictEqual($textarea.val(), ' ', '"hello world" -> " "');
});

QUnit.test('ltrim', function (assert) {
    var options = {
        characterMask: ' \t\n\r\u0000\u000b'
    };

    $textarea.val(' hello world');
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual($textarea.val(), 'hello world', '" hello world" -> "hello world"');

    $textarea.val(' привет мир');
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual($textarea.val(), 'привет мир', '" привет мир" -> "привет мир"');

    $textarea.val(' \t\n\r\u0000\u000bhello world');
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual(
        $textarea.val(),
        'hello world',
        '" \\t\\n\\r\\u0000\\u000bhello world" -> "hello world"'
    );

    $textarea.val('hello world');
    options.characterMask = 'hello';
    cetver.validationFilters.ltrim($form, attribute, options);
    assert.strictEqual($textarea.val(), ' world', '"hello world" -> " world"');
});

QUnit.test('rtrim', function (assert) {
    var options = {
        characterMask: ' \t\n\r\u0000\u000b'
    };

    $textarea.val('hello world ');
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual($textarea.val(), 'hello world', '"hello world " -> "hello world"');

    $textarea.val('привет мир ');
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual($textarea.val(), 'привет мир', '"привет мир " -> "привет мир"');

    $textarea.val('hello world \t\n\r\u0000\u000b');
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual(
        $textarea.val(),
        'hello world',
        '"hello world \\t\\n\\r\\u0000\\u000b" -> "hello world"'
    );

    $textarea.val('hello world');
    options.characterMask = 'world';
    cetver.validationFilters.rtrim($form, attribute, options);
    assert.strictEqual($textarea.val(), 'hello ', '"hello world" -> "hello "');
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
    $textarea.val('hello world');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'HELLO WORLD', '"hello world" -> "HELLO WORLD"');

    $textarea.val('привет мир');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'ПРИВЕТ МИР', '"привет мир" -> "ПРИВЕТ МИР"');

    options.mode = modes.MB_CASE_LOWER;

    $textarea.val('HELLO WORLD');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'hello world', '"HELLO WORLD" -> "hello world"');

    $textarea.val('ПРИВЕТ МИР');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'привет мир', '"ПРИВЕТ МИР" -> "привет мир"');

    options.mode = modes.MB_CASE_TITLE;

    $textarea.val('hello world');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'Hello World', '"hello world" -> "Hello World"');

    $textarea.val('HELLO WORLD');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'Hello World', '"HELLO WORLD" -> "Hello World"');

    $textarea.val('привет мир');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'Привет Мир', '"привет мир" -> "Привет Мир"');

    $textarea.val('ПРИВЕТ МИР');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'Привет Мир', '"ПРИВЕТ МИР" -> "Привет Мир"');

    $textarea.val('hello  world');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'Hello  World', '"hello  world" -> "Hello  World"');

    $textarea.val('привет  мир');
    cetver.validationFilters.mb_convert_case($form, attribute, options);
    assert.strictEqual($textarea.val(), 'Привет  Мир', '"привет  мир" -> "Привет  Мир"');

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
    $textarea.val('hello world');
    cetver.validationFilters.ucfirst($form, attribute);
    assert.strictEqual($textarea.val(), 'Hello world', '"hello world" -> "Hello world"');

    $textarea.val('привет мир');
    cetver.validationFilters.ucfirst($form, attribute);
    assert.strictEqual($textarea.val(), 'Привет мир', '"привет мир" -> "Привет мир"');
});

QUnit.test('lcfirst', function (assert) {
    $textarea.val('HELLO WORLD');
    cetver.validationFilters.lcfirst($form, attribute);
    assert.strictEqual($textarea.val(), 'hELLO WORLD', '"HELLO WORLD" -> "hELLO WORLD"');

    $textarea.val('ПРИВЕТ МИР');
    cetver.validationFilters.lcfirst($form, attribute);
    assert.strictEqual($textarea.val(), 'пРИВЕТ МИР', '"ПРИВЕТ МИР" -> "пРИВЕТ МИР"');
});