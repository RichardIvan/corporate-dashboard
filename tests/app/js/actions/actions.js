// import { createThunkStore } from './helpers'

//
// import o from '../../../../ospec/ospec.js'
//
// o.spec('first test', () => {
//   o('addition', () => {
//     o(1 + 1).equals(2)
//   })
// })

import o from '../../../../ospec/ospec.js'

import { isFSA } from 'flux-standard-action'
import { initLoad } from '../../../../app/js/actions'

o.spec('inital load', () => {
  o('action is FSA compliant', () => {
    o(isFSA(initLoad())).equals(true)
  })
})
