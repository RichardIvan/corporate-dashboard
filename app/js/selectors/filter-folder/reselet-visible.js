/* @flow */
'use strict'

import { createSelector } from 'reselect'
// import reduce from 'lodash/reduce'
// import map from 'lodash/map'
// import uniqBy from 'lodash/uniqBy'

import { List, Map } from 'immutable'

import { getFilteredSorted } from './'
import { getOffset } from '../offset'

export const getVisible = createSelector(
  getFilteredSorted,
  getOffset,
  (filteredSorted: List, offset: Map): List => {
    const start = offset.get('value') * 10
    const end = start + 10

    const partial = filteredSorted.slice(start, end)
    const diff = 10 - partial.count()

    if( diff > 0) {
      return partial.concat(new Array(diff))
    }

    return partial
  }
)
