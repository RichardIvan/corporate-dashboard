/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import {
  List,
} from 'immutable'

import {
  getFiltered,
} from '../../../../../app/js/selectors/'

describe('Get Filtered Issues Selector', () => {
  describe('#getAllFilteredIssues()', () => {
    let state
    beforeEach(() => {
      state = {
        filteredIssues: {
          value: List.of(),
        },
      }
    })
    // should have state argument
    it('should have state argument or throw', () => {
      expect(getFiltered.bind(null)).toThrow('missing state argument')
      expect(getFiltered.bind(null, state)).toNotThrow()
    })

    // should return a list
    it('should reutrn a list', () => {
      expect(getFiltered(state)).toBeA(List)
    })
  })
})
