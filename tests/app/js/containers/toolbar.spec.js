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

// import o from '../../../../ospec/ospec.js'

import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import Toolbar from '../../../../app/js/containers/Toolbar'

describe('Toolbar container', () => {
  it('with geo route should have h1', () => {
    expect(mq(Toolbar, { route: 'geo' }).has('h1')).toBe(true)
  })

  it('with data route should have h1', () => {
    expect(mq(Toolbar, { route: 'data' }).has('h1')).toBe(true)
  })

  it('with graph route should have h1', () => {
    expect(mq(Toolbar, { route: 'graph' }).has('h1')).toBe(true)
  })

  it('should display Manhattan on random route parameter', () => {
    expect(mq(Toolbar, { route: 'test' }).contains('Manhattan')).toBe(true)
  })
})

// o.spec('toolbar container', () => {
//   o.spec('structure', () => {
//     o('toolbar on geo root has h1', () => {
//       // o(true).equals(true)
//       o(mq(Toolbar, { route: 'geo' }).has('h1')).equals(true)
//     })
//
//     o('toolbar on data root has h1', () => {
//       // o(true).equals(true)
//       o(mq(Toolbar, { route: 'data' }).has('h1')).equals(true)
//     })
//
//     o('toolbar on graph root has h1', () => {
//       // o(true).equals(true)
//       o(mq(Toolbar, { route: 'graph' }).has('h1')).equals(true)
//     })
//
//     o('displays Manhattan on random route parameter', () => {
//       o(mq(Toolbar, { route: 'test' }).contains('Manhattan')).equals(true)
//     })
//   })
//   // o.spec('behaviour', () => {
//   //   o('behaves', () => {
//   //     o(true).equals(true)
//   //   })
//   // })
// })
