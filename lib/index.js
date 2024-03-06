/**
 * @typedef {import('mdast').Root} Root
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {object | null | undefined} [options]
 *   Configuration passed to `textr`;
 *   for example, you may want to set the ISO 639-1 locale code of the content,
 *   which is important for stuff like the correct primary and secondary quotes
 * @property {ReadonlyArray<TextrPlugin | string> | null | undefined} [plugins]
 *   Textr plugins;
 *   if strings are passed in, those are loaded with `import`.
 *
 * @callback TextrPlugin
 *   Textr plugin.
 *
 *   Textr plugins are available on npm labelled with a `textr` keyword.
 *   You can also create them yourself, as shown in the example above.
 * @param {string} value
 *   Value to transform.
 * @param {object} options
 *   Global configuration passed to textr.
 * @returns {string | null | undefined | void}
 *   Changed text (optional).
 */

import textr from 'textr'
import {visit} from 'unist-util-visit'

/** @type {Readonly<Options>} */
const emptyOptions = {}

/**
 * Improve typography with Textr.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function remarkTextr(options) {
  const settings = options || emptyOptions
  const plugins = settings.plugins || []
  const textrOptions = settings.options || {}

  if (plugins.every((plugin) => typeof plugin === 'function')) {
    const typography = textr(textrOptions).use(...plugins)

    /**
     * Transform synchronously.
     *
     * @param {Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree) {
      visit(tree, 'text', function (node) {
        node.value = typography.exec(node.value)
      })
    }
  }

  const promise = Promise.all(
    plugins.map(async function (value) {
      if (typeof value === 'string') {
        // Assume value at default.
        /** @type {{default: TextrPlugin}} */
        const module_ = await import(value)
        return module_.default
      }

      return value
    })
  ).then(function (list) {
    return textr(textrOptions).use(...list)
  })

  /**
   * Transform asynchronously.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {Promise<undefined>}
   *   Nothing.
   */
  return async function (tree) {
    const typography = await promise
    visit(tree, 'text', function (node) {
      node.value = typography.exec(node.value)
    })
  }
}
