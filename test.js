import test from 'tape'
import remark from 'remark'
import typographicQuotes from 'typographic-quotes'
import textr from './index.js'

test('textr', async function (t) {
  t.equal(
    (await remark().use(textr).process('## spread operator...\n')).toString(),
    '## spread operator...\n',
    'should work without arguments'
  )

  t.equal(
    (
      await remark()
        .use(textr, {options: {locale: 'ru'}})
        .process('## spread operator...\n')
    ).toString(),
    '## spread operator...\n',
    'should work without plugins'
  )

  t.equal(
    (
      await remark()
        .use(textr, {plugins: [ellipses]})
        .process(
          [
            '## spread operator...',
            '',
            '    function(...args) { return args; }',
            ''
          ].join('\n')
        )
    ).toString(),
    [
      '## spread operator…',
      '',
      '    function(...args) { return args; }',
      ''
    ].join('\n'),
    'should run textr on a node'
  )

  t.equal(
    (
      await remark()
        .use(textr, {
          plugins: ['typographic-ellipses', typographicQuotes],
          options: {locale: 'ru'}
        })
        .process('yo "there" ...\n')
    ).toString(),
    'yo «there» …\n',
    'should support options'
  )

  t.end()
})

// Textr plugin: just a function to replace triple dots to ellipses.
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…')
}
