'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import reducer from '../../../../app/js/reducers/offset'
import { CHANGE_OFFSET } from '../../../../app/js/actions'

describe('Offset', () => {
  it('be initialized with 0', () => {
    let state
    const action = {
      type: 'NONE',
      payload: 1,
    }
    const newState = reducer(state, action)

    expect(newState).toBe(0)
  })

  it('should produce same state that is passed in payload', () => {
    const state = 0
    const action = {
      type: CHANGE_OFFSET,
      payload: 1,
    }
    const newState = reducer(state, action)

    expect(newState).toBe(1)
  })

  it('should have immutable state', () => {
    const state = 0

    const action = {
      type: CHANGE_OFFSET,
      payload: 1,
    }

    reducer(state, action)

    expect(state).toBe(0)
  })
})
