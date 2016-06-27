/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { fromJS, Map } from 'immutable'

import { getAllFilters } from '../../../../app/js/selectors'

import { OPENING_TIMESTAMP_TYPE } from '../../../../app/js/actions'

// describe('Get Filter By Type Selector', () => {
//   let state
//
//   beforeEach(() => {
//     state = {
//       filters: {
//         [OPENING_TIMESTAMP_TYPE]: {
//           active: true,
//         },
//       },
//     }
//   })
//
//   // it('should throw if no state or tyep is given', () => {
//   //   expect(getFilter()).toThrow()
//   // })
//   //
//   // it('should throw if no type is given', () => {
//   //   expect(getFilter(state)).toThrow()
//   // })
//
//   it('should retrive object with acive field', () => {
//     expect(getFilter(state, OPENING_TIMESTAMP_TYPE)).toEqual({ active: true })
//   })
// })

describe('Filter Selectors', function () {
  describe('#getAllFilters()', function () {
    it('should return object of filters', () => {

      const state = {
        filters: Map({
          name: Map({
            type: 'name',
            active: 'true',
            by: '',
          })
        })
      }

      const output = getAllFilters(state)

      expect(typeof output).toBe('object')
    })
  })
})
