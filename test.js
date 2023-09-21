/**
 * @typedef {import('./index.js').TextrPlugin} TextrPlugin
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
// @ts-expect-error: untyped.
import typographicQuotes_ from 'typographic-quotes'
import remarkTextr from './index.js'

/** @type {TextrPlugin} */
const typographicQuotes = typographicQuotes_

test('remarkTextr', async function (t) {
  await t.test('should work without arguments', async function () {
    assert.equal(
      String(
        await remark().use(remarkTextr).process('## spread operator...\n')
      ),
      '## spread operator...\n'
    )
  })

  await t.test('should work without plugins', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkTextr, {options: {locale: 'ru'}})
          .process('## spread operator...\n')
      ),
      '## spread operator...\n'
    )
  })

  await t.test('should run textr on a node', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkTextr, {plugins: [ellipses]})
          .process(
            [
              '## spread operator...',
              '',
              '    function(...args) { return args; }',
              ''
            ].join('\n')
          )
      ),
      [
        '## spread operator…',
        '',
        '    function(...args) { return args; }',
        ''
      ].join('\n')
    )
  })

  await t.test('should support options', async function () {
    assert.equal(
      String(
        await remark()
          .use(remarkTextr, {
            plugins: ['typographic-ellipses', typographicQuotes],
            options: {locale: 'ru'}
          })
          .process('yo "there" ...\n')
      ),
      'yo «there» …\n'
    )
  })
})

// Textr plugin: just a function to replace triple dots to ellipses.
/** @type {TextrPlugin} */
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…')
}
