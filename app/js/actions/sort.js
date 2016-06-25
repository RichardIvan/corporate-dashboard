/* @flow */
'use strict'

import { SET_SORT } from './constants'

export function setSort(type: string) {
  console.log('setsort Action')
  if (!type) {
    throw new Error('missing sort type')
  }

  return {
    type: SET_SORT,
    payload: {
      type,
    },
  }
}
