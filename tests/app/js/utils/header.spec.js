'use strict'

import o from '../../../../ospec/ospec'
import { resolveHeader } from '../../../../app/js/utils'
// import constants from '../../../../app/js/utils/constants'

o.spec('toolbar utility', () => {
  o('geo translates to Manhattan', () => {
    o(resolveHeader('geo')).equals('Manhattan')
  })

  o('data translates to Data', () => {
    o(resolveHeader('data')).equals('Data')
  })

  o('graph translates to Graph', () => {
    o(resolveHeader('graph')).equals('Graph')
  })

  o('anything else translates to Dashboard', () => {
    o(resolveHeader('borough')).equals('Dashboard')
  })
})
