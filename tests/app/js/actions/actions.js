// import { createThunkStore } from './helpers'

//
// import o from '../../../../ospec/ospec.js'
//
// o.spec('first test', () => {
//   o('addition', () => {
//     o(1 + 1).equals(2)
//   })
// })

// import o from '../../../../ospec/ospec.js'

import { describe, it } from 'mocha'
import expect from 'expect'

import { isFSA } from 'flux-standard-action'
import { initLoad } from '../../../../app/js/actions'

describe('first test', () => {
  it('should be ok', () => {
    expect(isFSA(initLoad())).toBe(true)
  })
})

// o.spec('inital load action creator', () => {
//   o('action is FSA compliant', () => {
//     o(isFSA(initLoad())).equals(true)
//   })
//
//   // has type INITIAL_LOAD
//   o('has INITIAL_LOAD action type', () => {
//     o(initLoad().type).equals('INITIAL_LOAD')
//   })
//   // returns a funciton since it is a promise
//
//   // this returned function has .then function
//
//
// })
