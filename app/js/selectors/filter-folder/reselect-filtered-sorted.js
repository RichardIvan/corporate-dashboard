/* @flow */
'use strict'

import { createSelector } from 'reselect'
// import reduce from 'lodash/reduce'
// import map from 'lodash/map'
// import uniqBy from 'lodash/uniqBy'

import { List } from 'immutable'

import { getFiltered, getSortBy } from './'

export const getFilteredSorted = createSelector(
  getFiltered,
  getSortBy,
  (fileredList: List, sortByMap: Map) => {
    const sorted = fileredList.sortBy((item) => item.getIn([sortByMap.get('type'), 'original']))
    return sortByMap.get('asc') ? sorted : sorted.reverse()
  }
)
