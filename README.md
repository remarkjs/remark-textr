# mdast-textr

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> [Mdast][mdast] plugin for [Textr][textr] — modular tool to [make your typography better][typewriter-habits].

Process your markdown with [Textr][textr] plugins, **skipping code**.

* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [CLI](#cli)

[typewriter-habits]: http://practicaltypography.com/typewriter-habits.html
[textr]: https://github.com/shuvalov-anton/textr

## Install

    npm install --save mdast-textr

## Usage

```js
import mdast from 'mdast';
import mdastTextr from 'mdast-textr';

// textr plugin — just function to replace triple dots to ellipses
const ellipses = input => input.replace(/\.{3}/gim, '…');

const text = `
## spread operator...

    function(...args) { return args; }
`.trim();

mdast.use(mdastTextr, { plugins: [ ellipses ] }).process(text);/*
## spread operator…

    function(...args) { return args; } */
```

## API

### mdast.use(mdastTextr[, mdastOptions])

#### mdastOptions

Type: `Object`  
Default: `{}`

Contain `plugins` and `options` which are Textr’s options. Check out [Textr usage section][textr-usage].

[textr-usage]: https://github.com/shuvalov-anton/textr#usage

##### mdastOptions.plugins

Type: `Array`  
Default: `[]`

Array of [Textr][textr] plugins. They are available on npm, labelled with [textr][textr-plugins] keyword. Also you can easily create new one. Don’t be scared.

[textr-plugins]: https://www.npmjs.com/browse/keyword/textr

##### mdastOptions.options

Type: `Object`  
Default: `{}`

Any option was set in `options` will be passed into [Textr][textr] as it's options.

For example, you may want to set your [ISO 639][iso] [locale code][locale]. It's important for right correction, basically for proper primary and secondary quotes.

## CLI

`mdast-textr` as mdast plugin has no CLI itself, so you are gonna use mdast CLI instead. So check the [mdast-cli docs][mdast-cli] first. `mdast` and `mdast-textr` both have to be installed. Also you have to define `textr` plugins as Array of Strings, but you are lucky and `mdast-textr` will require them for you!

[mdast-cli]: https://github.com/wooorm/mdast/#cli
[t-base]: https://github.com/iamstarkov/typographic-base

### inline

    mdast --use "textr=plugins:['typographic-base']" README.md --output README.md

### config

    mdast README.md --output README.md

With this `.mdastrc` config defined:

```json
{
  "plugins": {
    "textr": {
      "plugins": [ "typographic-base"],
      "options": { "locale": "en-us" }
    }
  }
}
```

## License

MIT © [Denys Dovhan](http://denysdovhan.com)

[mdast]: http://mdast.js.org/
[use]: https://github.com/wooorm/mdast#mdastuseplugin-options
[locale]: https://github.com/shuvalov-anton/textr#locale-option-consistence
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
