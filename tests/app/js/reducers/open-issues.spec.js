/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { Map, fromJS } from 'immutable'

import reducer from '../../../../app/js/reducers/open-issues'

import moment from 'moment'

describe('Open issues reducer', () => {
  describe('Range is set to all', () => {
    let state
    let issuesReducer
    let rangeReducer

    beforeEach(() => {
      state = Map({
        total: 0,
      })

      issuesReducer = Map({
        '1': Map({
          id: '1',
          open_status: Map({
            original: true,
          }),
        }),
        '2': Map({
          id: '2',
          open_status: Map({
            original: true,
          }),
        }),
        '3': Map({
          id: '3',
          open_status: Map({
            original: true,
          }),
        }),
        '4': Map({
          id: '4',
          open_status: Map({
            original: false,
          }),
        }),
        '5': Map({
          id: '5',
          open_status: Map({
            original: 'false',
          }),
        }),
        '6': Map({
          id: '6',
          open_status: Map({
            original: 'true',
          }),
        }),
      })

      rangeReducer = Map({
        range: 'all',
      })
    })
    it('should be initialized with zero', () => {
      let undefinedState
      const action = {
        type: 'asdf',
        rangeReducer,
      }
      const newState = reducer(undefinedState, action)

      expect(newState).toEqual(fromJS({
        total: 0,
      }))
    })

    it('should set total for all the issues', () => {
      const action = {
        type: "SET_RANGE",
        issuesReducer,
        rangeReducer,
      }
      const newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 4,
      }))
    })

      // should filter all issues if range is set to all
    it('should filter all issues if range is set to all', () => {
      const action = {
        type: "SET_RANGE",
        issuesReducer,
        rangeReducer,
      }
      let newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 4,
      }))


      // second assert
      action.rangeReducer = Map({
        'range': 'none'
      })

      newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 0,
      }))

    })

    it('should change only if the SET_RANGE action is being fired', () => {
      const action = {
        type: "YES",
        issuesReducer,
        rangeReducer,
      }
      let newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 0,
      }))

      action.type = "SET_RANGE"

      newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 4,
      }))

    })

      // should change only if NEW_ISSUE action is being fired
    it('should change only if NEW_ISSUE action is being fired', () => {
      const action = {
        type: "YES",
        issuesReducer,
        rangeReducer,
      }
      let newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 0,
      }))

      action.type = "PUSH_DATA"

      newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 4,
      }))
    })

      // shoul dchange only if INIT_LOAD action is being fired
    it('should change only if INIT_LOAD action is being fired', () => {
      const action = {
        type: "YES",
        issuesReducer,
        rangeReducer,
      }
      let newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 0,
      }))

      action.type = "INIT_LOAD"

      newState = reducer(state, action)

      expect(newState).toEqual(fromJS({
        total: 4,
      }))
    })
  })

  describe('Range is set', () => {
    // should set total for the range of filtered issues
    describe('Should set total for the range of issues', () => {
      let state
      let issuesReducer
      let rangeReducer

      beforeEach(() => {
        state = Map({ total: 0 })

        issuesReducer = fromJS({
          '1': {
            id: '1',
            open_status: {
              original: true,
            },
            opening_timestamp: {
              original: +moment('01/12/2005', 'DD/MM/YYYY').format('x'),
            },
            closing_timestamp: {
              original: '',
            },
          },
          '2': {
            id: '2',
            open_status: {
              original: true,
            },
            opening_timestamp: {
              original: +moment('02/12/2005', 'DD/MM/YYYY').format('x'),
            },
            closing_timestamp: {
              original: ''
            },
          },
          '3': {
            id: '3',
            open_status: {
              original: true,
            },
            opening_timestamp: {
              original: +moment('22/12/2005', 'DD/MM/YYYY').format('x'),
            },
            closing_timestamp: {
              original: '',
            },
          },
          '4': {
            id: '4',
            open_status: {
              original: false,
            },
            opening_timestamp: {
              original: +moment('01/12/2005', 'DD/MM/YYYY').format('x'),
            },
            closing_timestamp: {
              original: +moment('12/12/2005', 'DD/MM/YYYY').format('x'),
            },
          },
          '5': {
            id: '5',
            open_status: {
              original: 'false',
            },
            opening_timestamp: {
              original: +moment('01/12/2005', 'DD/MM/YYYY').format('x'),
            },
            closing_timestamp: {
              original: +moment('12/12/2005', 'DD/MM/YYYY').format('x'),
            },
          },
          '6': {
            id: '6',
            open_status: {
              original: 'true',
            },
            opening_timestamp: {
              original: +moment('12/12/2005', 'DD/MM/YYYY').format('x'),
            },
            closing_timestamp: {
              original: '',
            },
          },
        })

        rangeReducer = Map({
          range: 'set',
          from: +moment('03/12/2005', 'DD/MM/YYYY').format('x'),
          to: +moment('09/12/2005', 'DD/MM/YYYY').format('x'),
        })
      })

      it('should should return count only within the specified range', () => {
        const action = {
          type: 'SET_RANGE',
          issuesReducer,
          rangeReducer,
        }

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          total: 2,
        }))
      })
    })
  })

})
