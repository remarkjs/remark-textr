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
import mdastTextr from 'mdast-textr';
import base from 'typographic-base';

mdast
  .use(mdastTextr, {
    plugins: [ base ],
    options: { locale: 'en-us' }
  })
  .process(`Hello -> "world"`); // Hello → “world”
```

## API

### [mdast][mdast].[use][use](mdastTextr[, mdastOptions])

Transforms only text nodes defined in `options.plugins`.

#### mdastOptions

Type: `Object`  
Default: `{}`

Optionst that will be passed to plugin. Specified by [mdast documentation][mdast-use].

##### mdastOptions.plugins

Type: `Array`  
Default: `[]`

Array of functions that will be executed. Besides, you can pass strings of package's names and they will be required.

##### mdastOptions.options

Type: `Object`  
Default: `{}`

Any option was set in `options` will be passed into [Textr][textr] as it's options.

For example, you may want to set your [ISO 639][iso] locale code. It's important for right correction, basically for proper primary and secondary quotes.

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

## License

MIT © [Denys Dovhan](http://denysdovhan.com)

[mdast]: http://mdast.js.org/
[use]: https://github.com/wooorm/mdast#mdastuseplugin-options
[iso]: http://www.wikiwand.com/en/List_of_ISO_639-1_codes

[mdastrc]: https://github.com/wooorm/mdast/blob/master/doc/mdastrc.5.md
[mdast-use]: https://github.com/wooorm/mdast/blob/master/doc/mdast.3.md#mdastuseplugin-options

[npm-url]: https://npmjs.org/package/mdast-textr
[npm-image]: https://img.shields.io/npm/v/mdast-textr.svg?style=flat-square

[travis-url]: https://travis-ci.org/denysdovhan/mdast-textr
[travis-image]: https://img.shields.io/travis/denysdovhan/mdast-textr.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/denysdovhan/mdast-textr
[coveralls-image]: https://img.shields.io/coveralls/denysdovhan/mdast-textr.svg?style=flat-square

[depstat-url]: https://david-dm.org/denysdovhan/mdast-textr
[depstat-image]: https://david-dm.org/denysdovhan/mdast-textr.svg?style=flat-square
