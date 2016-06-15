'use strict'

// import '../../js/misc'
import { describe, it } from 'mocha'
import expect from 'expect'

// import o from '../../../../ospec/ospec.js'
import mq from 'mithril-query'

import Navbar from '../../../../app/js/containers/Root/Navbar'

describe('mq test', () => {
  it('should be ok', () => {
    expect(mq(Navbar).has('div')).toBe(true)
  })
})

// o.spec('navbar container', () => {
//   o.spec('structure', () => {
//     o('has div', () => {
//       o(mq(Navbar).has('div')).equals(true)
//     })
//
//     o('has ul', () => {
//       o(mq(Navbar).has('ul')).equals(true)
//     })
//
//     o('has 4 li', () => {
//       o(mq(Navbar).should.have.at.least(4, 'li')).equals()
//     })
//   })
//   // o.spec('behaviour', () => {
//   //   o('behaves', () => {
//   //     o(true).equals(true)
//   //   })
//   // })
// })
