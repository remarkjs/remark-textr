/** @typedef {import('./index.js').TextrPlugin} TextrPlugin */

import test from 'tape'
import {remark} from 'remark'
/** @type {TextrPlugin} */
// @ts-expect-error: untyped.
import typographicQuotes from 'typographic-quotes'
import remarkText from './index.js'

test('remarkText', async (t) => {
  t.equal(
    (
      await remark().use(remarkText).process('## spread operator...\n')
    ).toString(),
    '## spread operator...\n',
    'should work without arguments'
  )

  t.equal(
    (
      await remark()
        .use(remarkText, {options: {locale: 'ru'}})
        .process('## spread operator...\n')
    ).toString(),
    '## spread operator...\n',
    'should work without plugins'
  )

  t.equal(
    (
      await remark()
        .use(remarkText, {plugins: [ellipses]})
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
        .use(remarkText, {
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
/** @type {TextrPlugin} */
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…')
}
