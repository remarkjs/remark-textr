# remark-textr [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Make your typography better][typewriter-habits] with [**remark**][remark] and
[**Textr**][textr] (skipping code).

## Installation

[npm][]:

```bash
npm install remark-textr
```

## Usage

Say we have the following file, `example.md`:

````markdown
## spread operator...

```js
function(...args) { return args; }
```
````

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile')
var remark = require('remark')
var textr = require('remark-textr')

// textr plugin — just function to replace triple dots to ellipses
function ellipses(input) {
  return input.replace(/\.{3}/gim, '…')
}

remark()
  .use(textr, {plugins: [ellipses]})
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Yields:

````markdown
## spread operator…

```js
function(...args) { return args; }
```
````

## API

### `remark.use(textr[, config])`

##### `config.plugins`

List of [Textr][] plugins (`Array.<string|Function>?`).
They are available on npm, labelled with [textr][textr-plugins] keyword.
Also you can easily create new one, as shown in the example above.
If strings are passed in, those are required.

##### `config.options`

Passed to [Textr][] as it’s options (`Object?`).
For example, you may want to set your [ISO 639][iso] [locale code][locale].
It’s important for stuff like the correct primary and secondary quotes.

## Contribute

See [`contributing.md` in `remarkjs/remark`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Denys Dovhan][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-textr.svg

[build-status]: https://travis-ci.org/remarkjs/remark-textr

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-textr.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-textr

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: license

[author]: http://denysdovhan.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md

[locale]: https://github.com/A/textr#locale-option-consistence

[iso]: http://www.wikiwand.com/en/List_of_ISO_639-1_codes

[typewriter-habits]: http://practicaltypography.com/typewriter-habits.html

[textr]: https://github.com/A/textr

[textr-plugins]: https://www.npmjs.com/browse/keyword/textr
