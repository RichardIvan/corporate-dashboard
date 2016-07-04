/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { Map, fromJS, List } from 'immutable'

import {
  getFilterSearchQuery,
  getFilterMenuResults,
  getFilterTimestamp,
} from '../../../../app/js/selectors'

describe('Filter Component selector', () => {
  let state

  beforeEach(() => {
    state = {
      filterComponentState: Map({
        open: true,
        selectedFilterMenu: 'name',
        filterSearchQuery: 'query',
        filterSearchQueryResults: List.of('one', 'two'),
        timestamp: Map({
          from: 123,
          to: 111,
        }),
      }),
    }
  })

  describe('#getFilterSearchQuery()', () => {
    it('should retrive query', () => {

      const newState = getFilterSearchQuery(state)

      expect(newState).toEqual('query')
    })
  })

  describe('#getFilterMenuResults()', () => {
    it('should retrive array of results', () => {
      const newState = getFilterMenuResults(state)

      expect(newState).toEqual(fromJS(['one', 'two']))
    })
  })

  describe('#getFromFilterTimestamp()', () => {
    it('should retrive from timestamp', () => {
      const newState = getFilterTimestamp(state, 'from')

      expect(newState).toEqual(123)
    })
  })

  describe('#getToFilterTimestamp()', () => {
    it('should retrive to timestamp', () => {
      const newState = getFilterTimestamp(state, 'to')

      expect(newState).toEqual(111)
    })
  })
})
