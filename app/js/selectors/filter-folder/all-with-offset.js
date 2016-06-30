/* @flow */
'use strict'

import slice from 'lodash/slice'

import { List } from 'immutable'

import { createSelector } from 'reselect'
// import { getSorted } from './get-sorted.js'
import { getOffset } from '../offset.js'
import { getSorted } from './sorted.js'

export const allWithOffset = createSelector(
  getOffset,
  getSorted,
  (offset, sortedData) => {
    let start
    if (offset === 0) {
      start = 0
    } else {
      start = offset * 10
    }

    let partial = sortedData.slice(start, start + 10)

    // let partial = slice(sortedData, start, start + 10)
    while (partial.count() < 10 ) {
      partial = partial.push(List.of())
    }
    return partial
  }
)
