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

import { createThunkStore } from './helpers'

import { isFSA } from 'flux-standard-action'

import { INITIAL_LOAD } from '../../../../app/js/actions/constants'
import { initLoad } from '../../../../app/js/actions'

describe('initial actions', () => {

  describe('#initLoad', () => {
    let store = null;

    beforeEach('create store', function () {
      store = createThunkStore(state => state, {
        issues: [],
      });
    });

    context('when called with empty body', () => {

      beforeEach('dispatch #initLoad() action', function() {
        return store.dispatch(initLoad())
      })

      it('creates INITIAL_LOAD action', () => {
        expect(store._dispatch).toHaveBeenCalledWith({
          type: INITIAL_LOAD
        })
      })

      it('should be FSA compliant', () => {
        expect(isFSA(initLoad())).toBe(true)
      })
    })

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
