// /* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { Map } from 'immutable'

import {
  SET_FILTER,
  RESET_FILTER,
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../../../../app/js/actions'

import reducer from '../../../../app/js/reducers/filters'

describe('Filter Reducer', () => {
  it('should return a Map', () => {
    let state
    const action = {
      type: 'NONE',
    }
    const newState = reducer(state, action)
    expect(Map.isMap(newState)).toBe(true)
  })

  it('should containt all types in map', () => {
    let state
    const action = {
      type: 'NONE',
    }
    const newState = reducer(state, action)
    expect(newState.has(NAME_TYPE)).toBe(true)
    expect(newState.has(EMAIL_TYPE)).toBe(true)
    expect(newState.has(OPENING_TIMESTAMP_TYPE)).toBe(true)
    expect(newState.has(CLOSING_TIMESTAMP_TYPE)).toBe(true)
    expect(newState.has(EMPLOYEE_TYPE)).toBe(true)
    expect(newState.has(OPEN_STATUS_TYPE)).toBe(true)
    expect(newState.has(LOCATION_TYPE)).toBe(true)
  })

  it('should Set new filter value correctly', () => {
    const state = Map({
      [OPENING_TIMESTAMP_TYPE]: Map({
        active: true,
      }),
    })
    let action = {
      type: SET_FILTER,
      payload: {
        type: OPENING_TIMESTAMP_TYPE,
        data: {
          active: false,
        },
      },
    }
    let newState = reducer(state, action)

    expect(newState).toEqual(Map({
      [OPENING_TIMESTAMP_TYPE]: Map({
        active: false,
      }),
    }))

    action = {
      type: 'SET_FILTER',
      payload: {
        type: 'opening_timestamp',
        data: {
          active: true,
        },
      },
    }

    newState = reducer(state, action)

    expect(newState).toEqual(Map({
      [OPENING_TIMESTAMP_TYPE]: Map({
        active: true,
      }),
    }))

  })

  it.only('should rest the filter to initial state', () => {
    const state = Map({
      [OPENING_TIMESTAMP_TYPE]: Map({
        active: true,
      }),
    })
    let action = {
      type: SET_FILTER,
      payload: {
        type: OPENING_TIMESTAMP_TYPE,
        data: {
          active: false,
        },
      },
    }
    reducer(state, action)

    action = {
      type: RESET_FILTER,
      payload: {
        type: OPENING_TIMESTAMP_TYPE,
      },
    }

    const newState = reducer(state, action)

    expect(newState).toEqual(Map({
      [OPENING_TIMESTAMP_TYPE]: Map({
        active: false,
        from: -1,
        to: -1,
      }),
    }))
  })
})
