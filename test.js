var test = require('tape')
var remark = require('remark')
var typographicQuotes = require('typographic-quotes')
var textr = require('.')

test('textr', function (t) {
  t.equal(
    remark().use(textr).processSync('## spread operator...\n').toString(),
    '## spread operator...\n',
    'should work without arguments'
  )

  t.equal(
    remark()
      .use(textr, {options: {locale: 'ru'}})
      .processSync('## spread operator...\n')
      .toString(),
    '## spread operator...\n',
    'should work without plugins'
  )

  t.equal(
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
    ].join('\n'),
    'should run textr on a node'
  )

  t.equal(
    remark()
      .use(textr, {
        plugins: ['typographic-ellipses', typographicQuotes],
        options: {locale: 'ru'}
      })
      .processSync('yo "there" ...\n')
      .toString(),
    'yo «there» …\n',
    'should support options'
  )

  t.end()
})

// Textr plugin: just a function to replace triple dots to ellipses.
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…')
}
