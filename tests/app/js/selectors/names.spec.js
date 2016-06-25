/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { List } from 'immutable'

import { getAllNames } from '../../../../app/js/selectors'

describe('Names Selector', () => {
  let state

  beforeEach(() => {
    state = {
      partials: {
        name: List.of('me', 'you', 'me', 'you'),
      },
    }
  })

  it('should retrieve an array', () => {

    const out = getAllNames(state)

    expect(Array.isArray(out)).toBe(true)
  })

  it('should include only unique names', () => {

    const out = getAllNames(state)

    expect(out).toEqual(['me', 'you'])
  })
})
