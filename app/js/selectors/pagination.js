/* @flow */
'use strict'

import { createSelector } from 'reselect'

import ceil from 'lodash/ceil'

import { getAllFilteredIssues } from './'
// import { NAME_TYPE } from '../actions/types'


export const getTotalNumberOfVisibleItems = createSelector(
  getAllFilteredIssues,
  (array) => {
    const length = array.count()
    const numberOfPages = ceil(length / 10)
    return numberOfPages
  }
)
