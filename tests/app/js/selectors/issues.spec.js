'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { fromJS } from 'immutable'

import { getVisibleIssues } from '../../../../app/js/selectors'

describe('Issue Selector', () => {
  it.only('should get array with 10 items', () => {

    const state = fromJS({
      issues: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    })

    console.log(state)

    expect(getVisibleIssues(state).length).toBe(10)
  })

  it('should ')
})
