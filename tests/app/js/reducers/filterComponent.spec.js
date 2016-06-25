/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import reducer, { initialState } from '../../../../app/js/reducers/filter-component-state'

describe('Filter Component Reducer', () => {
  describe('common', () => {
    it('should have initial state', () => {

      const action = {
        type: 'UNKNOWN',
      }

      const newState = reducer(undefined, action)

      expect(newState).toEqual(initialState)
    })

    it.only('should be immutable', () => {
      const state = initialState

      const action = {
        type: 'UNKNOWN',
      }

      reducer(state, action)

      expect(state).toBe(state)
    })
  })

  describe('#SET_FILTER_COMPONENT_OPEN_STATUS', function () {
    it('should set state to true', () => {

    })

    it('should set state to false', () => {

    })
  })

  describe('#SET_FILTER_COMPONENT_STATE', function () {
    it('should set the correct filter component state', () => {

    })
  })

  describe('#RESET_FILTER_COMPONENT_STATE', function () {
    it('should reset component to initial state', () => {

    })
  })

  describe('#CLOSE_OVERLAY', function () {
    it('should reset component to initial state', () => {

    })
  })

})
