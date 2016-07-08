/* @flow */
'use strict'

import moment from 'moment'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { Map, fromJS } from 'immutable'

import reducer from '../../../../app/js/reducers/range-reducer'

describe('Range Reducer', () => {
  let state

  beforeEach(() => {
    const from = +moment().startOf('day').subtract(6, 'days').format('x')
    const to = +moment().startOf('day').format('x')
    state = Map({
      range: 'all',
      from: from,
      to: to,
    })
  })

  // it should be initialized with range of all
  it('should be initialized with range of all and from and to properties', () => {
    let undefinedState
    const action = {
      type: 'SET_RANGE',
    }
    const from = +moment().startOf('day').subtract(6, 'days').format('x')
    const to = +moment().startOf('day').format('x')
    const newState = reducer(undefinedState, action)

    expect(newState).toEqual(fromJS({
      range: 'all',
      from: from,
      to: to,
    }))
  })

  // it should have immutable state
  it('should have immutable state', () => {
    const action = {
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: 123,
        to: 1234,
      }
    }
    const newState = reducer(state, action)
    const from = +moment().startOf('day').subtract(6, 'days').format('x')
    const to = +moment().startOf('day').format('x')

    expect(state).toEqual(fromJS({
      range: 'all',
      from: from,
      to: to,
    }))
  })

  // it should throw if no range is provided
  it('should return state if no range is provided', () => {
    const anotherState = Map({
      range: 'set',
    })
    const action = {
      type: 'SET_RANGE',
      payload: {},
    }
    const newState = reducer(anotherState, action)

    expect(newState).toEqual(anotherState)
  })

  // set range to all
  it('should set range to all by merging', () => {
    const action = {
      type: 'SET_RANGE',
      payload: {
        range: 'all',
      }
    }
    const alteredState = state.set('range', 'set')
    const newState = reducer(alteredState, action)
    const from = +moment().startOf('day').subtract(6, 'days').format('x')
    const to = +moment().startOf('day').format('x')

    expect(newState).toEqual(fromJS({
      range: 'all',
      from: from,
      to: to,
    }))
  })

  // return state if no matching action type
  it('should return state if no matching action type is there', () => {
    const action = {
      type: 'NO_TYPE',
      payload: {
        range: 'all',
      }
    }
    const newState = reducer(state, action)

    expect(newState).toEqual(state)
  })


  // it should respond on SET_RANGE of a specific range
  it('should respont on SET_RANGE action type of a specific range', () => {
    const action = {
      type: 'SET_RANGE',
      payload: {
        range: 'set',
        from: 123,
        to: 1234,
      }
    }
    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      range: 'set',
      from: 123,
      to: 1234,
    }))
  })
})
