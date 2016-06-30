/* @flow */
'use strict'

import { SET_OFFSET } from '../actions'

import { getTotalNumberOfVisibleItems, getOffset } from '../selectors'

export function setOffset(value, state) {
  let val
  const total = getTotalNumberOfVisibleItems(state)
  if (!isNaN(parseInt(value, 10))) {
    val = value - 1
    if (val > total) {
      val = total - 1
    }
  } else {
    const offset = getOffset(state)
    const temp = offset

    if ( value === 'next' && temp + 1 >= total ) {
      val = total - 1
    } else {
      val = value
    }
  }

  return {
    type: SET_OFFSET,
    payload: {
      value: val,
      state,
    },
  }
}
