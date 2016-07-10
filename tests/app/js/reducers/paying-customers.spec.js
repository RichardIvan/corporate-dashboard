/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { Map, fromJS } from 'immutable'

import reducer from '../../../../app/js/reducers/rereduce-graph-data'

describe('Paying Customers Reducer', () => {

  // should initialize with empty map
  it('should initialize with empty map', () => {
    let state
    const action = {}

    const newState = reducer(state, action)

    expect(newState).toEqual(Map())


    // expect(newState).toEqual(fromJS({
    //   '12345': 50,
    //   '56789': 20,
    // }))
  })

  // should be immutable
  it('should be immutable', () => {
    let state
    const action = {
      type: 'INIT_LOAD',
      payload: {
        payingCustomersData: {
          "16": {
            "12": {
              "12": 2,
            },
          },
        },
      },
    }

    reducer(state, action)

    expect(state).toBe(state)
  })

  // shourt return a map
  it('should return a map', () => {
    let state
    const action = {
      type: 'INIT_LOAD',
      payload: {
        payingCustomersData: {
          "16": {
            "12": {
              "12": 2,
            },
          },
        },
      },
    }

    const newState = reducer(state, action)

    expect(newState).toBeA(Map)
  })

  // should respond to INIT_LOAD action type
  it('should respond to INIT_LOAD action type only', () => {
    const state = Map()
    let action = {
      type: 'INIT_LOAD',
      payload: {
        payingCustomersData: {
          "16": {
            "12": {
              "12": 2,
            },
          },
        },
      },
    }

    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      data: {
        "16": {
          "12": {
            '12': 2,
          },
        },
      }
    }))

    action = {
      type: 'INVALID_ACTION_BRO',
      payload: {
        payingCustomersData: {
          "16": {
            "12": {
              "12": 2,
            },
          },
        },
      },
    }

    const nextState = reducer(state, action)

    expect(nextState).toEqual(Map())
  })

  // should save incoming data
})
