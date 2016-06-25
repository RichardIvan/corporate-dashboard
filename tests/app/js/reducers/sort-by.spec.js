/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { fromJS } from 'immutable'

// import { initialState } from '../../../../app/js/reducers/sort-by.js'
import reducer, { initialState } from '../../../../app/js/reducers/sort-by'

import { setSort } from '../../../../app/js/actions'

describe('Sort Reducer', () => {
  it('should be immutable', () => {
    const state = initialState

    const action = setSort('name')

    reducer(state, action)

    expect(state).toBe(state)
  })

  // should have set working
  it('should be setting sort correctly when passed different type', () => {
    const state = initialState

    const action = setSort('bro')

    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      type: 'bro',
      asc: true,
    }))
  })

  it('should be setting sort correctly when passed same type', () => {
    const state = initialState

    const action = setSort('opening_timestamp')

    console.log(state)
    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      type: 'opening_timestamp',
      asc: false,
    }))
  })

  // should return initial state
  it('should return initial state', () => {
    const action = setSort('a')

    const newState = reducer(undefined, action)

    expect(newState).toEqual(fromJS({
      type: 'a',
      asc: true,
    }))
  })

  // should return state for unrecognized action type
  it('should return state for unrecognized action type', () => {
    const action = setSort('UNRECOGNIZED_TYPE')

    const newState = reducer(initialState, action)

    expect(newState).toEqual(fromJS({
      type: 'UNRECOGNIZED_TYPE',
      asc: true,
    }))
  })
})
