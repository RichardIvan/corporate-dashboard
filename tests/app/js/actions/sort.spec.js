/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { isFSA } from 'flux-standard-action'
import { setSort } from '../../../../app/js/actions'

describe('Test Sort Action Creator', () => {
  it('should be FSA', () => {
    const action = setSort('name')

    expect(isFSA(action)).toBe(true)
  })

  // it should throw if youdont provide type
  it('should throw when no type provided', () => {
    expect(setSort).toThrow('Missing sort type')
  })

  // does have type of sort
  it('should contain type of sort', () => {
    const action = setSort('name')

    expect(action.payload.type).toBe('name')
  })
})
