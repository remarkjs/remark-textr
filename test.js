import { equal } from 'assert';
import mdast from 'mdast';
import base from 'typographic-base';
import typographer from './index';

const t = (text, options) =>
  mdast().use(typographer, options).process(text).trim();

describe('mdast-textr', () => {

  it('should return original text', () =>
    equal(t(`Hello, "world"...`), `Hello, "world"...`)
  );

  it('should return transformed text', () =>
    equal(
      t(`Hello, "world"...`, {
        plugins: [ base ]
      }),
      `Hello, “world”…`
    )
  );

  it('should load options', () =>
    equal(
      t(`"quotes"`, {
        locale: 'uk',
        plugins: [ base ]
      }),
      `«quotes»`
    )
  );

});
