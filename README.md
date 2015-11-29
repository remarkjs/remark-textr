# mdast-textr

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> Mdast plugin for [Textr][textr] — modular tool to [make your typography better][typewriter-habits].

This plugin will help you to transform only _text_ nodes from your markdown using any functions that get text, transform it and return result of processing. For example, check out [typographic-*][tfs] functions. All of those functions are being composed using [Textr][textr].

[typewriter-habits]: http://practicaltypography.com/typewriter-habits.html
[tfs]: https://github.com/denysdovhan/mdast-typographer/blob/master/package.json#L53-L65
[textr]: https://github.com/shuvalov-anton/textr

## Install

Install **mdast-textr** using [npm][npm]:

    npm install --save mdast-typographer

[npm]: https://docs.npmjs.com/cli/install

## Usage

You can use it as a plugin for [mdast][mdast]:

```js
import mdast from 'mdast';
import mdtextr from 'mdast-textr';
import base from 'typograhic-base';

mdast
  .use(mdtextr, {
    plugins: [ base ],
    locale: 'en-us'
  })
  .process(`Hello -> "world"`); // Hello → “world”
```

## API

### [mdast][mdast].[use][use](typo[, options])

Transforms only text nodes defined in `options.plugins`.

#### options

Type: `Object`

Any option was set in `options`, except `plugins` field, will be passed into [Textr][textr] as it's options.

For example, you may want to set your [ISO 639][iso] locale code. It's important for right correction, basically for proper primary and secondary quotes.

##### options.plugins

Type: `Array`  
Default: `[]`

Array of functions that will be executed. Besides, you can pass strings of package's names and they will be required.

## CLI

You can easy use this plugin from CLI like so:

    mdast --use 'textr=plugins:["typographic-base"]' example.md

Also, you have ability to define options using [`.mdastrc` or `package.json`][mdastrc]. An example `.mdastrc` could look like this:

```json
{
  "plugins": {
    "textr": {
      "plugins": ["typographic-base"],
      "locale": "en-us"
    }
  }
}
```

[mdastrc]: https://github.com/wooorm/mdast/blob/master/doc/mdastrc.5.md

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

[npm-url]: https://npmjs.org/package/mdast-textr
[npm-image]: https://img.shields.io/npm/v/mdast-textr.svg?style=flat-square

[travis-url]: https://travis-ci.org/denysdovhan/mdast-textr
[travis-image]: https://img.shields.io/travis/denysdovhan/mdast-textr.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/denysdovhan/mdast-textr
[coveralls-image]: https://img.shields.io/coveralls/denysdovhan/mdast-textr.svg?style=flat-square

[depstat-url]: https://david-dm.org/denysdovhan/mdast-textr
[depstat-image]: https://david-dm.org/denysdovhan/mdast-textr.svg?style=flat-square
