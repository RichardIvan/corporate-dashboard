require('ignore-styles')
// require('babel-register')

global.window = require('mithril/test-utils/domMock.js')()
global.window = Object.assign(global.window, require('mithril/test-utils/pushStateMock')())
