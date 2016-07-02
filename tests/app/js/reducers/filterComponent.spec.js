/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { fromJS, List } from 'immutable'

import reducer, { initialState } from '../../../../app/js/reducers/filter-component-state'

import {
  SET_FILTER_COMPONENT_OPEN_STATUS,
  SET_FILTER_COMPONENT_MENU_STATE,
  RESET_FILTER_COMPONENT_STATE,
  CLOSE_OVERLAY,
  CLOSE_FILTER_COMPONENT,
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

      expect(newState).toEqual(initialState.set('open', true))
    })

    it('should set state to false', () => {
      const state = initialState

      const action = {
        type: SET_FILTER_COMPONENT_OPEN_STATUS,
        payload: false,
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(initialState.set('open', false))
    })
  })

  describe('#SET_FILTER_COMPONENT_STATE', () => {
    it('should set the correct filter component state', () => {
      const state = initialState

      const action = {
        type: SET_FILTER_COMPONENT_MENU_STATE,
        payload: 'name',
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(initialState.set('selectedFilterMenu', 'name'))
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

      expect(newState).toEqual(initialState.set('open', true))

      const secondState = initialState.set('selectedFilterMenu', 'bro')

      newState = reducer(secondState, action)

      expect(newState).toEqual(initialState.set('open', true))
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

  describe('#CLOSE_OVERLAY', () => {
    it('should reset component to initial state', () => {
      const state = initialState

      const action = {
        type: CLOSE_OVERLAY,
      }

      const newState = reducer(state, action)

      expect(newState).toEqual(initialState)
    })
  })

  describe('#SET_FILTER', () => {
    // SETS THE OPENING TIMESTAMP
    let state

    beforeEach(() => {
      state = initialState
    })

    it('should set opening timestamp', () => {
      const action = {
        type: 'SET_FILTER',
        payload: {
          type: 'opening_timestamp',
          timestampType: 'from',
          value: 1,
        },
      }

      const newState = reducer(state, action)

      expect(newState.get('timestamp')).toEqual(fromJS({
        from: 1,
        to: 0,
      }))
    })

    // SETS THE CLOSING SIMESTAMP
    it('should set closing timestamp', () => {
      const action = {
        type: 'SET_FILTER',
        payload: {
          type: 'opening_timestamp',
          timestampType: 'to',
          value: 1,
        },
      }

      const newState = reducer(state, action)

      expect(newState.get('timestamp')).toEqual(fromJS({
        from: 0,
        to: 1,
      }))
    })
  })

  describe('#FILTER_SEARCH_RESULT', () => {

    let state

    beforeEach(() => {
      state = initialState
    })

    // SETS THE LOCATION QUERY and result
    it('should set the location query and result', () => {
      const action = {
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: 'location',
          term: 'up',
          results: ['upper west', 'upper east'],
        },
      }

      const newState = reducer(state, action)

      expect(newState.get('filterSearchQuery')).toBe('up')
      expect(newState.get('filterSearchQueryResults')).toEqual(List.of('upper west', 'upper east'))
    })

    // SETS THE NAME QUERY
    it('should set the name query and result', () => {
      const action = {
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: 'name',
          term: 'your name',
          results: ['myname', 'your name'],
        },
      }

      const newState = reducer(state, action)

      expect(newState.get('filterSearchQuery')).toBe('your name')
      expect(newState.get('filterSearchQueryResults')).toEqual(List.of('myname', 'your name'))
    })

    // SETS THE EMAIL QUERY
    it('should should set email query and resuts', () => {
      const action = {
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: 'email_address',
          term: 'your@name',
          results: ['your@name'],
        },
      }

      const newState = reducer(state, action)

      expect(newState.get('filterSearchQuery')).toBe('your@name')
      expect(newState.get('filterSearchQueryResults')).toEqual(List.of('your@name'))
    })

    // SETS THE EMLOYEE QUERY
    it('should should set employee_name query and resuts', () => {
      const action = {
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: 'employee_name',
          term: 'm',
          results: ['maxdacosta'],
        },
      }

      const newState = reducer(state, action)

      expect(newState.get('filterSearchQuery')).toBe('m')
      expect(newState.get('filterSearchQueryResults')).toEqual(List.of('maxdacosta'))
    })

    // RETURNS STATE FOR ANY OTHER QUERY
    it('should should return state if there is unknows type passed', () => {
      const action = {
        type: 'FILTER_SEARCH_RESULT',
        payload: {
          type: 'yes',
          term: 'm',
          results: ['maxdacosta'],
        },
      }

      const newState = reducer(state, action)

      expect(newState.get('filterSearchQuery')).toBe('')
      expect(newState.get('filterSearchQueryResults')).toEqual(List.of())
    })

  })
})
