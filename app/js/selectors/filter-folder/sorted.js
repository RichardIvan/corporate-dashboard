/* @flow */
'use strict'

import { createSelector } from 'reselect'
// import reduce from 'lodash/reduce'
// import orderBy from 'lodash/orderBy'

import { List } from 'immutable'

import { getAllFilteredData } from './'
import { getSortBy } from './sortby'

export const getSorted = createSelector(
  getSortBy,
  getAllFilteredData,
  (sortBy, filteredData) => {
    // filtered data gets full items
    // console.log(filteredData.count())

    if (filteredData.isEmpty()) {
      return List.of()
    }

    const sorted = filteredData.sortBy((item) => item.getIn([sortBy.type, 'original']))
    // ImmutableSorted.forEach((item) => console.log(item.getIn([sortBy.type, 'original'])))

    // console.log(ImmutableSorted)

    // const sorted = orderBy(filteredData, (item) => {
    //   console.log(item)
    //   // console.log(item.getIn(sortBy.type, 'original'))
    //   return item[sortBy.type].original
    // }, [sortBy.asc ? 'asc' : 'desc'])

    // console.log(sortBy.asc ? sorted : sorted.reverse())

    return sortBy.asc ? sorted : sorted.reverse()
  }
)
