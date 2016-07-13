/* @flow */
'use strict'

import { createSelector } from 'reselect'

import ceil from 'lodash/ceil'

import { getFiltered } from './filter-folder'

export const getTotalNumberOfVisibleItems = createSelector(
  getFiltered,
  (array) => {
    const length = array.count()
    const numberOfPages = ceil(length / 10)
    return numberOfPages
  }
)
