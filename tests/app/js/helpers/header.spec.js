'use strict'

import o from '../../../../ospec/ospec'
import { resolveHeading } from '../../../../app/js/helpers'
// import constants from '../../../../app/js/utils/constants'

o.spec('toolbar utility', () => {
  o.spec('root', () => {
    o('root geo translates to Manhattan', () => {
      o(resolveHeading('root', 'geo')).equals('Manhattan')
    })

    o('root data translates to Data', () => {
      o(resolveHeading('root', 'data')).equals('Data')
    })

    o('root graph translates to Graph', () => {
      o(resolveHeading('root', 'graph')).equals('Graph')
    })

    o('root anything else translates to Manhattan', () => {
      o(resolveHeading('root', 'borough')).equals('Manhattan')
    })
  })

  o.spec('main', () => {
    o('main geo translates to Number of open issues', () => {
      o(resolveHeading('main', 'geo')).equals('Number of open issues')
    })

    o('main data translates to Issues', () => {
      o(resolveHeading('main', 'data')).equals('Issues')
    })

    o('main graph translates to Issues', () => {
      o(resolveHeading('main', 'graph')).equals('Issues')
    })

    o('main anything else translates to Number of open issues', () => {
      o(resolveHeading('main', 'borough')).equals('Number of open issues')
    })
  })
})
