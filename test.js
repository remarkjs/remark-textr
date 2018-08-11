var equal = require('assert').equal;
var remark = require('remark');
var typographicQuotes = require('typographic-quotes');
var textr = require('.');

// textr plugin — just function to replace triple dots to ellipses
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…');
}

it('should work without arguments', function() {
  equal(
    remark()
      .use(textr)
      .processSync('## spread operator...\n')
      .toString(),
    '## spread operator...\n'
  );
});

it('should work without plugins', function() {
  equal(
    remark()
      .use(textr, {options: {locale: 'ru'}})
      .processSync('## spread operator...\n')
      .toString(),
    '## spread operator...\n'
  );
});

it('should run textr on a node', function() {
  equal(
    remark()
      .use(textr, {plugins: [ellipses]})
      .processSync(
        [
          '## spread operator...',
          '',
          '    function(...args) { return args; }',
          ''
        ].join('\n')
      )
      .toString(),
    [
      '## spread operator…',
      '',
      '    function(...args) { return args; }',
      ''
    ].join('\n')
  );
});

it('should support options', function() {
  equal(
    remark()
      .use(textr, {
        plugins: ['typographic-ellipses', typographicQuotes],
        options: {locale: 'ru'}
      })
      .processSync('yo "there" ...\n')
      .toString(),
    'yo «there» …\n'
  );
});
