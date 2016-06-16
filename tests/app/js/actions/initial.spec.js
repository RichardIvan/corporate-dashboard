/* @flow */

import { describe, it } from 'mocha'
import expect from 'expect'

import { createThunkStore } from './helpers'

import { isFSA } from 'flux-standard-action'

import { INIT_LOAD, INIT_LOAD_SUCESS } from '../../../../app/js/actions/constants'
import { initLoad, initSucess } from '../../../../app/js/actions'

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
          type: INIT_LOAD
        })
      })

      it('should be FSA compliant', () => {
        expect(isFSA(initLoad())).toBe(true)
      })
    })

  })

  describe('#initSucess', () => {
    let store = null;

    beforeEach('create store', function () {
      store = createThunkStore(state => state, {
        issues: [],
      });
    });

    context('when called with empty body', () => {

      beforeEach('dispatch #initSucess() action', function() {
        return store.dispatch(initSucess())
      })

      it('creates INIT_LOAD_SUCESS action', () => {
        expect(store._dispatch).toHaveBeenCalledWith({
          type: INIT_LOAD_SUCESS
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
