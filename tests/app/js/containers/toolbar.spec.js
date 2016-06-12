'use strict'

// import '../../js/misc'

// console.log(global.window)
// if (!global.window) {
//   global.window = require('mithril/test-utils/domMock.js')()
//   global.window = Object.assign(global.window, require('mithril/test-utils/pushStateMock')())
// }
// console.log(global.window)
//
// global.window = require('mithril/test-utils/domMock.js')()
// global.window = Object.assign(global.window, require('mithril/test-utils/pushStateMock')())

import o from '../../../../ospec/ospec.js'
import mq from 'mithril-query'

import Toolbar from '../../../../app/js/containers/Toolbar'

o.spec('toolbar container', () => {
  o.spec('structure', () => {
    o('toolbar has h1', () => {
      // o(true).equals(true)
      o(mq(Toolbar).has('h1')).equals(true)
    })
  })
  // o.spec('behaviour', () => {
  //   o('behaves', () => {
  //     o(true).equals(true)
  //   })
  // })
})
