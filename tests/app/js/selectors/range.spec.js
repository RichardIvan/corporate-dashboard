/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { Map } from 'immutable'

import { getRange } from '../../../../app/js/selectors'

describe('Range Selector', () => {
  let state

  beforeEach(() => {
    state = {
      graphRange: Map({
        range: 'all',
        from: 123,
        to: 1234,
      }),
    }
  })
  // it should retrieve a map
  it('should should retrieve a Map', () => {
    expect(getRange(state)).toBeA(Map)
  })

  // this map should have a range property
  it('should have a range property', () => {
    expect(getRange(state).has('range')).toBe(true)
  })

  // this map should have a from property
  it('should have a from property', () => {
    expect(getRange(state).has('from')).toBe(true)
  })

  //this map should have a to property
  it('should have a to property', () => {
    expect(getRange(state).has('to')).toBe(true)
  })
})
