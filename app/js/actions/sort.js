/* @flow */
'use strict'

import { SET_SORT } from './constants'

export function setSort(type: string) {
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
