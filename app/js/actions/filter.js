/* @flow */
'use strict'

import {
  SET_FILTER,
  FILTER_SEARCH_RESULT,
  RESET_FILTERS,
  CLEAR_TIMESTAMP,
} from './constants'

// import {
//   OPENING_TIMESTAMP_TYPE,
//   CLOSING_TIMESTAMP_TYPE,
// } from './types.js'

export function setFilter(type, value) {
  return {
    type: SET_FILTER,
    payload: {
      'type': type,
      'value': value,
    },
  }
}

export function clearTimestamp(type) {

  return {
    type: SET_FILTER,
    payload: {
      'type': type,
      value: 0,
    },
  }
}

export function setSearchFilterValues(type, value) {

  // perform fuse search here
  const result = []

  return {
    type: FILTER_SEARCH_RESULT,
    payload: {
      'type': type,
      'value': value,
      result,
    },
  }
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  }
}
