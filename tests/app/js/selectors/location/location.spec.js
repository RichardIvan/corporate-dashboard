/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import {
  getLocations,
} from '../../../../../app/js/selectors'

describe('Location Selector', () => {
  let state
  beforeEach(() => {
    state = new Map()
  })
  it('should return have a state passed it', () => {
    expect(getLocations.bind(null)).toThrow('missing state argument')
    expect(getLocations.bind(null, state)).toNotThrow()
  })
})
