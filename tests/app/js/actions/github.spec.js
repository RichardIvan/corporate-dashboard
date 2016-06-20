// import { describe, it, beforeEach } from 'mocha'
// import expect from 'expect'
//
// import { createThunkStore } from './helpers'
//
// import { isFSA } from 'flux-standard-action'
//
// import { fetchRepo } from '../../../../app/js/actions/github.js'
//
// describe('github action', () => {
//   describe('#fetchRepo', () => {
//     let store = null
//
//     beforeEach('create store', () => {
//       store = createThunkStore(state => state, {
//         issues: [],
//       })
//     })
//
//     describe('when called with empty body', () => {
//
//       beforeEach('dispatch #initLoad() action', function() {
//         return store.dispatch(fetchRepo('not/sure'))
//       })
//
//       it('creates INITIAL_LOAD action', () => {
//         expect(store._dispatch).toThrow()
//       })
//
//       console.log(fetchRepo('not/sure'))
//
//       it('should be FSA compliant', () => {
//         expect(isFSA(fetchRepo('not/sure'))).toBe(true)
//       })
//     })
//   })
// })
