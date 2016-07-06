/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { Map, fromJS } from 'immutable'
import { getOpenIssuesTotal } from '../../../../app/js/selectors'

describe('Open issues Selector', () => {
  // NOTE uses rereduce recucer | use value
  it('should get the open issues map', () => {
    const state = {
      numberOfOpenIssues: {
        value: Map({
          total: 5,
        })
      }
    }
    const secondState = {
      numberOfOpenIssues: {
        value: Map({
          total: 10,
        })
      }
    }

    expect(getOpenIssuesTotal(state)).toEqual(fromJS({
      total: 5,
    }))

    expect(getOpenIssuesTotal(secondState)).toEqual(fromJS({
      total: 10,
    }))
  })
})
