'use strict'

import '../../js/misc'

import o from '../../../../ospec/ospec.js'
import mq from 'mithril-query'

import Toolbar from '../../../../app/js/components/Toolbar'

o.spec('tool component', () => {
  o.spec('structure', () => {
    o('has h1', () => {
      o(mq(Toolbar).has('h1')).equals(true)
    })

    o('displays Geospacial', () => {
      o(mq(Toolbar, { heading: 'Geospacial' }).contains('Geospacial')).equals(true)
    })

    o('displays Data', () => {
      o(mq(Toolbar, { heading: 'Data' }).contains('Data')).equals(true)
    })

    o('displays Graph', () => {
      o(mq(Toolbar, { heading: 'Graph' }).contains('Graph')).equals(true)
    })
  })
  // o.spec('behaviour', () => {
  //   o('behaves', () => {
  //     o(true).equals(true)
  //   })
  // })
})
