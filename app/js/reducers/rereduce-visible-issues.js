/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { List } from 'immutable'

import filteredSortedReducer from './rereduce-filtered-sorted'
import offsetReducer from './rereduce-offset'

export const initialState = List.of(new Array(10))

const visibleIssues = createReducer({ filteredSortedReducer, offsetReducer },
  (state = initialState, action, { filteredSortedReducer, offsetReducer }) => {

  // this runs on every action
  const start = offsetReducer.get('value') * 10
  const end = start + 10

  const partial = filteredSortedReducer.slice(start, end)
  const diff = 10 - partial.count()

  if( diff > 0) {
    return partial.concat(new Array(diff))
  }

  return partial
})

export default visibleIssues
