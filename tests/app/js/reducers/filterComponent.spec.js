/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { fromJS } from 'immutable'

import reducer, { initialState } from '../../../../app/js/reducers/filter-component-state'

import {
  SET_FILTER_COMPONENT_OPEN_STATUS,
  SET_FILTER_COMPONENT_STATE,
  RESET_FILTER_COMPONENT_STATE,
  OVERLAY_CLOSED,
  CLOSE_FILTER_COMPONENT
} from '../../../../app/js/actions'

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

    it('should set state to false', () => {
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

  describe('#SET_FILTER_COMPONENT_STATE', () => {
    it('should set the correct filter component state', () => {
      const state = initialState

      const action = {
        type: SET_FILTER_COMPONENT_STATE,
        payload: 'name',
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        open: false,
        selectedFilterMenu: 'name',
      }))
    })
  })

  describe('#RESET_FILTER_COMPONENT_STATE', () => {
    it('should reset component to initial state', () => {
      let state = initialState
      state = state.set('open', true)

      const action = {
        type: RESET_FILTER_COMPONENT_STATE,
      }

      let newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        open: true,
        selectedFilterMenu: 'root',
      }))

      state = state = state.set('open', false)

      newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        open: false,
        selectedFilterMenu: 'root',
      }))
    })
  })

  describe('#CLOSE_FILTER_COMPONENT', () => {
    it('should reset component to initial state', () => {
      const state = initialState

      const action = {
        type: CLOSE_FILTER_COMPONENT,
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(initialState)
    })
  })

  describe('#OVERLAY_CLOSED', () => {
    it('should reset component to initial state', () => {
      const state = initialState

      const action = {
        type: OVERLAY_CLOSED,
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(initialState)
    })
  })
})
