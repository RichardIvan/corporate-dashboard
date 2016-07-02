/* @flow */
'use strict'

import { createSelector } from 'reselect'
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'

import { List } from 'immutable'

import { getSingleDataByFilter, getActiveFilters } from './'
import { getIssues } from '../issues.js'
import { getState } from '../state'

export function getFiltered(state) {
  return state.filteredIssues.value
}

export const getAllFilteredData = createSelector(
  getActiveFilters,
  getState,
  (mapOfActiveFilters, state) => {
    const issues = getIssues(state)
    if (mapOfActiveFilters.isEmpty()) {
      if (issues.isEmpty()) {
        return List.of()
      }
      console.log(issues.reduce((reduction, value) => reduction.push(value), List.of()))
      const reduced = issues.reduce((reduction, value) => reduction.push(value), List.of())
      console.log(reduced)
      return reduced
    }

    console.log(mapOfActiveFilters)

    const filteredItemsWithDuplicates = reduce(
      mapOfActiveFilters, (accumulator, filter) => {
        return accumulator.concat(getSingleDataByFilter(filter.type)(state))
      }, [])

    // remove duplicates
    const unique = uniqBy(filteredItemsWithDuplicates, (pair) => pair[0])

    const full = map(unique, (item) => {
      return issues[item[0]]
    })
    return full
  }
)
