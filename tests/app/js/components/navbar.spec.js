'use strict'

import o from '../../../../ospec/ospec.js'
import mq from 'mithril-query'

import Navbar from '../../../../app/js/containers/Navbar'

o.spec('navbar container', () => {
  o.spec('structure', () => {
    o('has div', () => {
      o(mq(Navbar).has('div')).equals()
    })

    o('has ul', () => {
      o(mq(Navbar).has('ul')).equals()
    })

    o('has 4 li', () => {
      o(mq(Navbar).has.at.least(4, 'li')).equals()
    })

    o('has 4 icons', () => {
      o(mq(Navbar).has.at.least(4, 'svg')).equals()
    })
  })
  o.spec('behaviour', () => {
    o('behaves', () => {
      o(true).equals(true)
    })
  })
})
