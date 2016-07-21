/* @flow */
'use strict'

import {
  SET_FILTER,
  RESET_FILTERS,
} from './constants'

export function setFilter(t: string, v): Object {
  return {
    type: SET_FILTER,
    payload: {
      type: t,
      value: v,
    },
  }
}

export function clearTimestamp(t: string): Object {
  return {
    type: SET_FILTER,
    payload: {
      type: t,
      value: 0,
    },
  }
}

export function resetFilters(): Object {
  return {
    type: RESET_FILTERS,
  }
}
