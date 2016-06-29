/* @flow */
'use strict'

import { createSelector } from 'reselect'
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'

import { getSingleDataByFilter, getActiveFilters } from './'
import { getIssues } from '../issues.js'
import { getState } from '../state'

export const getAllFilteredData = createSelector(
  getActiveFilters,
  getState,
  (mapOfActiveFilters, state) => {
    const issues = getIssues(state)
    if (!Object.keys(mapOfActiveFilters).length) {
      return map(issues, (value, key) => issues[key])
    }
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
