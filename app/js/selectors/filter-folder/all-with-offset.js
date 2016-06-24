/* @flow */
'use strict'

import slice from 'lodash/slice'

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

    let partial = slice(sortedData, start, start + 10)
    while (partial.length < 10 ) {
      partial.push(new Array())
    }
    return partial
  }
)
