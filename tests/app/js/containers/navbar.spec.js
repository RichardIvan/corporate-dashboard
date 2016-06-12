'use strict'

import '../../js/misc'

import o from '../../../../ospec/ospec.js'
import mq from 'mithril-query'

import Navbar from '../../../../app/js/containers/Navbar'

o.spec('navbar container', () => {
  o.spec('structure', () => {
    o('has div', () => {
      o(mq(Navbar).has('div')).equals(true)
    })

    o('has ul', () => {
      o(mq(Navbar).has('ul')).equals(true)
    })

    o('has 4 li', () => {
      o(mq(Navbar).should.have.at.least(4, 'li')).equals()
    })
  })
  // o.spec('behaviour', () => {
  //   o('behaves', () => {
  //     o(true).equals(true)
  //   })
  // })
})
