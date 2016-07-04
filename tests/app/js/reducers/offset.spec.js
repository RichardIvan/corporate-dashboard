'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import reducer from '../../../../app/js/reducers/offset'
import { SET_OFFSET } from '../../../../app/js/actions'

import { fromJS, Map } from 'immutable'

describe('Offset Reducer', () => {
  it('be initialized with 0', () => {
    let state
    const action = {
      type: 'NONE',
      payload: 1,
    }
    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      value: 0,
    }))
  })

  it('should produce same state that is passed in payload', () => {
    const state = Map({ value: 0 })
    const action = {
      type: SET_OFFSET,
      payload: {
        value: 1,
      }
    }
    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      value: 1,
    }))
  })

  it('should return zero if negative number is passed in', () => {
    const state = Map({ value: 0 })
    const action = {
      type: SET_OFFSET,
      payload: {
        value: -1,
      },
    }

    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      value: 0,
    }))
  })

  it('should increase state by one if "next" is passed in', () => {
    const state = Map({ value: 0 })
    const action = {
      type: SET_OFFSET,
      payload: {
        value: 'next',
      },
    }

    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      value: 1,
    }))
  })

  it('should decrease the value if the "previou" is passed in', () => {
    const state = Map({ value: 1 })
    const action = {
      type: SET_OFFSET,
      payload: {
        value: 'previous',
      },
    }

    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      value: 0,
    }))
  })

  it('should not decrease the value if the "previou" is passed in and current value is 0', () => {
    const state = Map({ value: 0 })
    const action = {
      type: SET_OFFSET,
      payload: {
        value: 'previous',
      },
    }

    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      value: 0,
    }))
  })

  it('should have immutable state', () => {
    const state = Map({ value: 0 })

    const action = {
      type: SET_OFFSET,
      payload: {
        value: 1,
      }
    }

    reducer(state, action)

    expect(state).toEqual(fromJS({
      value: 0
    }))
  })
})
