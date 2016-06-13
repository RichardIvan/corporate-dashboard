'use strict'

import o from '../../../../ospec/ospec'
import { resolveHeading } from '../../../../app/js/utils'
// import constants from '../../../../app/js/utils/constants'

o.spec('toolbar utility', () => {
  o('geo translates to Manhattan', () => {
    o(resolveHeading('geo')).equals('Manhattan')
  })

  o('data translates to Data', () => {
    o(resolveHeading('data')).equals('Data')
  })

  o('graph translates to Graph', () => {
    o(resolveHeading('graph')).equals('Graph')
  })

  o('anything else translates to Dashboard', () => {
    o(resolveHeading('borough')).equals('Dashboard')
  })
})
