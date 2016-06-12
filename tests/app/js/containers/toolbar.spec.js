'use strict'

import '../../js/misc'

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
