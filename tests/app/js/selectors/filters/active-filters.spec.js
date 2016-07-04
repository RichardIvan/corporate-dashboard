/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { getActiveFilters } from '../../../../../app/js/selectors/filter-folder'
import { initialState } from '../../../../../app/js/reducers/filters-helpers'

describe('Selector - Get Active Filters', () => {
  it('should return all active filters', () => {
    const state = {
      filters: initialState,
    }

    expect(getActiveFilters(state).count()).toBe(0)

    // console.log(state.filters.setIn(['name', 'active'], true))
    const newState = {
      filters: state.filters.setIn(['name', 'active'], true),
    }

    expect(getActiveFilters(newState).count()).toBe(1)
  })
})
