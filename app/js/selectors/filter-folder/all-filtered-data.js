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
    if (mapOfActiveFilters.length === 0) {
      const keys = Object.keys(issues)
      return map(keys, (issueID) => issues[issueID])
    }
    const filteredItemsWithDuplicates = reduce(
      mapOfActiveFilters, (accumulator, filter) => {
        // console.log(getSingleDataByFilter(filter.type)(state))
        return accumulator.concat(getSingleDataByFilter(filter.type)(state))
        // return [...accumulator, getSingleDataByFilter(filter.type)(state)]
      }, [])

    // remove duplicates
    const unique = uniqBy(filteredItemsWithDuplicates, (pair) => pair[0])


    const full = map(unique, (item) => {
      return issues[item[0]]
    })
    return full
  }
)
