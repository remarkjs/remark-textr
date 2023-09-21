# remark-textr

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to [improve typography][typewriter-habits] with
**[Textr][]**.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkTextr[, options])`](#unifieduseremarktextr-options)
    *   [`Options`](#options)
    *   [`TextrPlugin`](#textrplugin)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to support [Textr][].

## When should I use this?

This project is useful if you want to automatically improve the text in your
markdown documents.
[Textr][] is a simple way to do that: no need to worry about ASTs.
On the other hand, ASTs are powerful, so some things are better done with
custom plugins: see [Create a plugin][unified-create-a-plugin].

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-textr
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkTextr from 'https://esm.sh/remark-textr@5'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkTextr from 'https://esm.sh/remark-textr@5?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

````markdown
## spread operator...

```js
function(...args) { return args; }
```
````

…and a module `example.js`:

```js
/**
 * @typedef {import('remark-textr').TextrPlugin} TextrPlugin
 */

import {remark} from 'remark'
import remarkTextr from 'remark-textr'
import {read} from 'to-vfile'

const file = await remark()
  .use(remarkTextr, {plugins: [ellipses]})
  .process(await read('example.md'))

console.log(String(file))

/**
 * Replace triple dots with ellipses.
 *
 * @type {TextrPlugin}
 */
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…')
}
```

…then running `node example.js` yields:

````markdown
## spread operator…

```js
function(...args) { return args; }
```
````

## API

This package exports no identifiers.
The default export is [`remarkTextr`][api-remark-text].

### `unified().use(remarkTextr[, options])`

[Improve typography][typewriter-habits] with [Textr][].

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `options` (`object`, optional)
    — configuration passed to `textr`;
    for example, you may want to set the ISO 639-1 [locale code][textr-locale]
    of the content, which is important for stuff like the correct primary and
    secondary quotes
*   `plugins` (`Array<TextrPlugin | string>`, optional)
    — textr plugins;
    if strings are passed in, those are loaded with `import`

### `TextrPlugin`

Textr plugin (TypeScript type).

Textr plugins are available on npm labelled with a [`textr`][textr-plugins]
keyword.
You can also create them yourself, as shown in the example above.

###### Parameters

*   `value` (`string`)
    — value to transform
*   `options` (`object`)
    — global configuration passed to textr

###### Returns

Changed text (`string`, optional).

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`Options`][api-options] and
[`TextrPlugin`][api-textr-plugin].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `remark-textr@^5`,
compatible with Node.js 12.

This plugin works with `unified` version 6+ and `remark` version 7+.

## Security

Use of `remark-textr` does not involve **[rehype][]** (**[hast][]**) or user
content so there are no openings for [cross-site scripting (XSS)][wiki-xss]
attacks.
[Textr][] operates on text nodes, which are always escaped by remark.

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Denys Dovhan][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-textr/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-textr/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-textr.svg

[coverage]: https://codecov.io/github/remarkjs/remark-textr

[downloads-badge]: https://img.shields.io/npm/dm/remark-textr.svg

[downloads]: https://www.npmjs.com/package/remark-textr

[size-badge]: https://img.shields.io/bundlejs/size/remark-textr

[size]: https://bundlejs.com/?q=remark-textr

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://denysdovhan.com

[hast]: https://github.com/syntax-tree/hast

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[textr]: https://github.com/A/textr

[textr-locale]: https://github.com/A/textr#locale-option-consistence

[textr-plugins]: https://www.npmjs.com/browse/keyword/textr

[typescript]: https://www.typescriptlang.org

[typewriter-habits]: https://practicaltypography.com/typewriter-habits.html

[unified]: https://github.com/unifiedjs/unified

[unified-create-a-plugin]: https://unifiedjs.com/learn/guide/create-a-plugin/

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[api-options]: #options

[api-remark-text]: #unifieduseremarktextr-options

[api-textr-plugin]: #textrplugin
