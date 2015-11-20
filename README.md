# mdast-typographer

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> Mdast plugin to [make your typography better][typewriter-habits].

This plugin transforms only _text_ nodes from your markdown using [`typographic-*`][tfs] transformers. All of those transformers are being composed using [Textr][textr]. By the way, you can add your own transformers or disable default ones.

[typewriter-habits]: http://practicaltypography.com/typewriter-habits.html
[tfs]: https://github.com/denysdovhan/mdast-typographer/blob/master/package.json#L53-L65
[textr]: https://github.com/shuvalov-anton/textr

## Install

Install mdast-typographer using [npm][npm]:

    npm install --save mdast-typographer

[npm]: https://docs.npmjs.com/cli/install

## Usage

You can use it as a plugin for [mdast][mdast]:

```js
import mdast from 'mdast';
import typo from 'mdast-typographer';

// Use this plugin as usual:
mdast.use(typo).process(`Hello -> "world"`); // Hello → “world”

// … or with options
mdast.use(typo, {
  locale: 'ru',
  before: [
    (t) => t.replace('world', 'guys')
  ],
  modules: {
    arrows: false
  },
  after: [
    (t) => t.replace('Hello', 'Goodbye')
  ]
}).process(`Hello -> "world"`); // Goodbye -> «guys»
```

## API

### [mdast][mdast].[use][use](typo[, options])

Transforms only text nodes and fixes your typography.

#### options

Type: `Object`

Options will be passed into plugin.

##### options.modules

Type: `Object`
Default: `{}`

`modules` object contains pairs of transformers and boolean value. If value equals `false`, then this transformer won't be executed. If value equals `true`, that transformer will be used as usual.

As default, mdast-typographer uses these transformers:

* **`apostrophes` — [typographic-apostrophes][apostrophes]** — typographic apostrophes in contractions and for possessive case.
* **`quotes` — [typographic-quotes][quotes]** —  typographic quotes for your text with respect to locale.
* **`plurals` — [typographic-apostrophes-for-possessive-plurals][plurals]** — typographic apostrophes for progressive plurals.
* **`arrows` — [typographic-arrows][arrows]** — typographic real arrows.
* **`copyright` — [typographic-copyright][copyright]** — typographic copyright.
* **`currency` — [typographic-currency][currency]** — replaces name of currency
* **`ellipses` — [typographic-ellipses][ellipses]** — avoids using periods and
* **`em` — [typographic-em-dashes][em]** — replaces `--` to em dash.
* **`en` — [typographic-en-dashes][en]** — safely replacing hyphens in a range of values with en dashes only.
* **`math` — [typographic-math-symbols][math]** — replaces alphabetic math symbols to real symbols.
* **`registered` — [typographic-registered-trademark](registered)** — replaces alphabetic registered trademark to real symbol.
* **`spaces` — [typographic-single-spaces](spaces)** — replace many spaces to one space.
* **`trademark` — [typographic-trademark](trademark)** — replaces alphabetic trademark to real symbol.

##### options.locale

Type: `String`  
Default: `en-us`

[ISO 639][iso] locale code. It's important for right correction, basically for proper primary and secondary quotes.

##### options.before

Type: `Array`  
Default: `[]`

Array of custom transformers that will be executed _before_ another.

##### options.after

Type: `Array`  
Default: `[]`

Array of custom transformers that will be executed _after_ another.

## License

MIT © [Denys Dovhan](http://denysdovhan.com)

[mdast]: http://mdast.js.org/
[use]: https://github.com/wooorm/mdast#mdastuseplugin-options
[iso]: http://www.wikiwand.com/en/List_of_ISO_639-1_codes

[apostrophes]: https://github.com/iamstarkov/typographic-apostrophes
[quotes]: https://github.com/iamstarkov/typographic-quotes
[plurals]: https://github.com/iamstarkov/typographic-apostrophes-for-possessive-plurals
[arrows]: https://github.com/andrepolischuk/typographic-arrows
[copyright]: https://github.com/iamstarkov/typographic-copyright
[currency]: https://github.com/talgautb/typographic-currency
[ellipses]: https://github.com/iamstarkov/typographic-ellipses
[em]: https://github.com/iamstarkov/typographic-em-dashes
[en]: https://github.com/iamstarkov/typographic-en-dashes
[math]: https://github.com/iamstarkov/typographic-math-symbols
[registered]: https://github.com/iamstarkov/typographic-registered-trademark
[spaces]: https://github.com/iamstarkov/typographic-single-spaces
[trademark]: https://www.npmjs.com/package/typographic-trademark

[npm-url]: https://npmjs.org/package/mdast-typographer
[npm-image]: https://img.shields.io/npm/v/mdast-typographer.svg?style=flat-square

[travis-url]: https://travis-ci.org/denysdovhan/mdast-typographer
[travis-image]: https://img.shields.io/travis/denysdovhan/mdast-typographer.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/denysdovhan/mdast-typographer
[coveralls-image]: https://img.shields.io/coveralls/denysdovhan/mdast-typographer.svg?style=flat-square

[depstat-url]: https://david-dm.org/denysdovhan/mdast-typographer
[depstat-image]: https://david-dm.org/denysdovhan/mdast-typographer.svg?style=flat-square
