# remark-textr

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to [improve typography][typewriter-habits] with
[**Textr**][textr].

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkTextr[, options])`](#unifieduseremarktextr-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to support [Textr][].

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast with Textr.

## When should I use this?

This project is useful if you want to automatically improve the text in your
markdown documents.
[Textr][] is a simple way to do that: no need to worry about ASTs.
On the other hand, ASTs are powerful, so some things are better done with
custom plugins: see [Create a plugin][create-a-plugin].

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-textr
```

In Deno with [Skypack][]:

```js
import remarkTextr from 'https://cdn.skypack.dev/remark-textr@5?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import remarkTextr from 'https://cdn.skypack.dev/remark-textr@5?min'
</script>
```

## Use

Say we have the following file, `example.md`:

````markdown
## spread operator...

```js
function(...args) { return args; }
```
````

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkTextr from 'remark-textr'

main()

async function main() {
  const file = await remark()
    .use(remarkTextr, {plugins: [ellipses]})
    .process(await read('example.md'))

  console.log(String(file))
}

/**
 * Textr plugin: a function that replaces triple dots with ellipses.
 *
 * @type {import('remark-textr').TextrPlugin}
 */
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…')
}
```

Yields:

````markdown
## spread operator…

```js
function(...args) { return args; }
```
````

## API

This package exports no identifiers.
The default export is `remarkTextr`.

### `unified().use(remarkTextr[, options])`

Plugin to [improve typography][typewriter-habits] with [**Textr**][textr].

##### `options`

Configuration.

###### `options.plugins`

List of [Textr][] plugins (`Array.<string|Function>?`).
If strings are passed in, those are loaded with `import`.
Textr plugins are available on npm labelled with a [`textr`][textr-plugins]
keyword.
You can also create them yourself, as shown in the example above.

###### `options.options`

[Textr][] options (`Object?`).
For example, you may want to set the [ISO 639-1][iso] [locale code][locale] of
the content, which is important for stuff like the correct primary and secondary
quotes.

## Types

This package is fully typed with [TypeScript][].
It exports `Options` and `TextrPlugin` types, which specify the interface of the
accepted options and Textr plugins.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 6+ and `remark` version 7+.

## Security

Use of `remark-textr` does not involve [**rehype**][rehype] ([**hast**][hast])
or user content so there are no openings for [cross-site scripting (XSS)][xss]
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

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-textr.svg

[size]: https://bundlephobia.com/result?p=remark-textr

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://denysdovhan.com

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[textr]: https://github.com/A/textr

[textr-plugins]: https://www.npmjs.com/browse/keyword/textr

[locale]: https://github.com/A/textr#locale-option-consistence

[iso]: https://www.wikiwand.com/en/List_of_ISO_639-1_codes

[typewriter-habits]: https://practicaltypography.com/typewriter-habits.html

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast

[create-a-plugin]: https://unifiedjs.com/learn/guide/create-a-plugin/
