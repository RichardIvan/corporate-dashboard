'use strict'

// import o from '../../../../ospec/ospec.js'

import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import Toolbar from '../../../../app/js/components/Toolbar'

describe('Toolbar component', () => {
  it('should display Geospacial heading', () => {
    expect(mq(Toolbar, { heading: 'Geospacial' }).contains('Geospacial')).toBe(true)
  })
  it('should display Data heading', () => {
    expect(mq(Toolbar, { heading: 'Data' }).contains('Data')).toBe(true)
  })
  it('should display Graph heading', () => {
    expect(mq(Toolbar, { heading: 'Graph' }).contains('Graph')).toBe(true)
  })
})

// o.spec('tool component', () => {
//   o.spec('structure', () => {
//     o('has h1', () => {
//       o(mq(Toolbar).has('h1')).equals(true)
//     })
//
//     o('displays Geospacial', () => {
//       o(mq(Toolbar, { heading: 'Geospacial' }).contains('Geospacial')).equals(true)
//     })
//
//     o('displays Data', () => {
//       o(mq(Toolbar, { heading: 'Data' }).contains('Data')).equals(true)
//     })
//
//     o('displays Graph', () => {
//       o(mq(Toolbar, { heading: 'Graph' }).contains('Graph')).equals(true)
//     })
//   })
//   // o.spec('behaviour', () => {
//   //   o('behaves', () => {
//   //     o(true).equals(true)
//   //   })
//   // })
// })
