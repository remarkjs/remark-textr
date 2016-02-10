# remark-textr

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> [Remark][remark] plugin for [Textr][textr] — modular tool to [make your typography better][typewriter-habits].

Process your markdown with [Textr][textr] plugins, **skipping code**.

* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [CLI](#cli)

[typewriter-habits]: http://practicaltypography.com/typewriter-habits.html
[textr]: https://github.com/A/textr

## Install

    npm install --save remark-textr

## Usage

```js
import remark from 'remark';
import remarkTextr from 'remark-textr';

// textr plugin — just function to replace triple dots to ellipses
const ellipses = input => input.replace(/\.{3}/gim, '…');

const text = `
## spread operator...

    function(...args) { return args; }
`.trim();

remark.use(remarkTextr, { plugins: [ ellipses ] }).process(text);/*
## spread operator…

    function(...args) { return args; } */
```

## API

### remark.use(remarkTextr[, remarkOptions])

#### remarkOptions

Type: `Object`  
Default: `{}`

Contain `plugins` and `options` which are Textr’s options. Check out [Textr usage section][textr-usage].

[textr-usage]: https://github.com/A/textr#usage

##### remarkOptions.plugins

Type: `Array`  
Default: `[]`

Array of [Textr][textr] plugins. They are available on npm, labelled with [textr][textr-plugins] keyword. Also you can easily create new one. Don’t be scared.

[textr-plugins]: https://www.npmjs.com/browse/keyword/textr

##### remarkOptions.options

Type: `Object`  
Default: `{}`

Any option was set in `options` will be passed into [Textr][textr] as it's options.

For example, you may want to set your [ISO 639][iso] [locale code][locale]. It's important for right correction, basically for proper primary and secondary quotes.

## CLI

`remark-textr` as remark plugin has no CLI itself, so you are gonna use remark CLI instead. So check the [remark-cli docs][remark-cli] first. `remark` and `remark-textr` both have to be installed. Also you have to define `textr` plugins as Array of Strings, but you are lucky and `remark-textr` will require them for you!

[remark-cli]: https://github.com/wooorm/remark/#cli
[t-base]: https://github.com/iamstarkov/typographic-base

### inline

    remark --use "textr=plugins:['typographic-base']" README.md --output README.md

### config

    remark README.md --output README.md

With this `.remarkrc` config defined:

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

[remark]: https://github.com/wooorm/remark
[use]: https://github.com/wooorm/remark#remarkuseplugin-options
[locale]: https://github.com/A/textr#locale-option-consistence
[iso]: http://www.wikiwand.com/en/List_of_ISO_639-1_codes

[remarkrc]: https://github.com/wooorm/remark/blob/master/doc/remarkrc.5.md
[remark-use]: https://github.com/wooorm/remark/blob/master/doc/remark.3.md#remarkuseplugin-options

[npm-url]: https://npmjs.org/package/remark-textr
[npm-image]: https://img.shields.io/npm/v/remark-textr.svg?style=flat-square

[travis-url]: https://travis-ci.org/denysdovhan/remark-textr
[travis-image]: https://img.shields.io/travis/denysdovhan/remark-textr.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/denysdovhan/remark-textr
[coveralls-image]: https://img.shields.io/coveralls/denysdovhan/remark-textr.svg?style=flat-square

[depstat-url]: https://david-dm.org/denysdovhan/remark-textr
[depstat-image]: https://david-dm.org/denysdovhan/remark-textr.svg?style=flat-square
