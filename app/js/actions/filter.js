/* @flow */
'use strict'

import {
  SET_FILTER,
  FILTER_SEARCH_RESULT,
  RESET_FILTERS,
  CLEAR_TIMESTAMP,
} from './constants'

import {
  getFilter,
} from '../selectors'
// import {
//   OPENING_TIMESTAMP_TYPE,
//   CLOSING_TIMESTAMP_TYPE,
// } from './types.js'

export function setFilter(type: string, value) {
  return {
    type: SET_FILTER,
    payload: {
      'type': type,
      'value': value,
    },
  }
}

export function clearTimestamp(type: string) {

  return {
    type: SET_FILTER,
    payload: {
      'type': type,
      value: 0,
    },
  }
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  }
}
