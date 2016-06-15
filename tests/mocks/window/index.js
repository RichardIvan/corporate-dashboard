global.window = require('mithril/test-utils/domMock.js')()
global.window = Object.assign(global.window, require('mithril/test-utils/pushStateMock')())
