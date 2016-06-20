/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'
import { Map, fromJS } from 'immutable'

import expectImmutable from 'expect-immutable'

expect.extend(expectImmutable)

import reducer from '../../../../app/js/reducers/issues.js'

describe('Issues Reducer', () => {
  it('returns an object on initialization', () => {
    const state = Map()
    const action = {
      type: 'INIT_LAOD',
    }
    const newState = reducer(undefined, action)

    expect(newState).toEqual(state)
  })

  it('is immutable', () => {
    const state = Map()
    const action = {
      type: 'INIT_LAOD',
      payload: {
        1: {
          id: 1,
        },
      },
    }
    reducer(state, action)

    expect(state).toEqual(state)
  })

  it('adds single incoming Object item to issues by id map', () => {
    const state = Map()
    const action = {
      type: 'INIT_LAOD',
      payload: {
        1: {
          id: 1,
        },
      },
    }
    const newState = reducer(state, action)

    expect(newState).toEqual(fromJS({
      issues: {
        '1': {
          id: 1,
        },
      },
    }))
  })
})
