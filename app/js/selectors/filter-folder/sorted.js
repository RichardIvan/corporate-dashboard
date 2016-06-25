/* @flow */
'use strict'

import { createSelector } from 'reselect'
// import reduce from 'lodash/reduce'
import orderBy from 'lodash/orderBy'

import { getAllFilteredData } from './'
import { getSortBy } from './sortby'

export const getSorted = createSelector(
  getSortBy,
  getAllFilteredData,
  (sortBy, filteredData) => {
    // filtered data gets full items
    const sorted = orderBy(filteredData, (item) => {
      return item[sortBy.type].original
    }, [sortBy.asc ? 'asc' : 'desc'])

    return sorted
  }
)
