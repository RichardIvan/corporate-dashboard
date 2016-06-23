/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { Map } from 'immutable'

import {
  SET_FILTER,
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
    const state = undefined
    const action = {
      type: 'NONE',
    }
    const newState = reducer(state, action)
    expect(Map.isMap(newState)).toBe(true)
  })

  it.only('should containt all types in map', () => {
    const state = undefined
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
})
