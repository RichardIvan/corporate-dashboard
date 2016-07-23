require('ignore-styles')
// require('babel-core/register')
require('babel-register')({
  // Optional ignore regex - if any filenames **do** match this regex then they
  // aren't compiled.
  // ignore: /regex/,

  // Ignore can also be specified as a function.
  ignore: function (filename) {
    if (filename.includes('/node_modules/rereduce')) {
      return false
    } else {
      return true
    }
  }

  // Optional only regex - if any filenames **don't** match this regex then they
  // aren't compiled
  // only: /my_es6_folder/,

  // Setting this will remove the currently hooked extensions of .es6, `.es`, `.jsx`
  // and .js so you'll have to add them back if you want them to be used again.
  // extensions: [".es6", ".es", ".jsx", ".js"]
})

global.window = require('mithril/test-utils/domMock.js')()
global.window = Object.assign(global.window, require('mithril/test-utils/pushStateMock')())

import expect from 'expect'
import expectImmutable from 'expect-immutable'

expect.extend(expectImmutable)
