/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { fromJS } from 'immutable'

import reducer, { initialState } from '../../../../app/js/reducers/filter-component-state'

import { SET_FILTER_COMPONENT_OPEN_STATUS } from '../../../../app/js/actions'

describe('Filter Component Reducer', () => {
  describe('common', () => {
    it('should have initial state', () => {

      const action = {
        type: 'UNKNOWN',
      }

      const newState = reducer(undefined, action)

      expect(newState).toEqual(initialState)
    })

    it('should be immutable', () => {
      const state = initialState

      const action = {
        type: 'UNKNOWN',
      }

      reducer(state, action)

      expect(state).toBe(state)
    })
  })

  describe('#SET_FILTER_COMPONENT_OPEN_STATUS', () => {
    it('should set state to true', () => {
      const state = initialState

      const action = {
        type: SET_FILTER_COMPONENT_OPEN_STATUS,
        payload: true,
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        open: true,
        selectedFilterMenu: 'root',
      }))
    })

    it.only('should set state to false', () => {
      const state = initialState

      const action = {
        type: SET_FILTER_COMPONENT_OPEN_STATUS,
        payload: false,
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        open: false,
        selectedFilterMenu: 'root',
      }))
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
