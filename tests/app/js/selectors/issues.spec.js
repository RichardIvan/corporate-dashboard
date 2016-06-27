'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { Map, List } from 'immutable'

import { getIssues } from '../../../../app/js/selectors'

describe('Issue Selector', () => {
  it('should get array with 10 items', () => {

    const state = {
      issues: Map({
        one: Map({
          one: 'two',
        }),
        two: Map({
          one: 'two',
        }),
        three: Map({
          one: 'two',
        }),
        four: Map({
          one: 'two',
        }),
        five: Map({
          one: 'two',
        }),
        six: Map({
          one: 'two',
        }),
        seven: Map({
          one: 'two',
        }),
        eight: Map({
          one: 'two',
        }),
        nine: Map({
          one: 'two',
        }),
        ten: Map({
          one: 'two',
        }),
      }
    ),
  }

    expect(Object.keys(getIssues(state)).length).toBe(10)
  })
})
