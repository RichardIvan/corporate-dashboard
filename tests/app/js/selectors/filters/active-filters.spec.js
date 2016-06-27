/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { getActiveFilters } from '../../../../../app/js/selectors/filter-folder'
import { initialState } from '../../../../../app/js/reducers/filters-helpers'

describe('Selector - Get Active Filters', () => {
  it('should return all active filters', () => {
    let state = {
      filters: initialState,
    }

    expect(Object.keys(getActiveFilters(state)).length).toBe(0)

    // console.log(state.filters.setIn(['name', 'active'], true))
    state = {
      filters: state.filters.setIn(['name', 'active'], true),
    }
    // console.log(newState)

    expect(Object.keys(getActiveFilters(state)).length).toBe(1)
  })
})
