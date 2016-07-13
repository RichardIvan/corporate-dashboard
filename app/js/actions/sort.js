/* @flow */
'use strict'

import { SET_SORT } from './constants'

export function setSort(type: string, state: Object): Object {
  if (!type || (typeof type !== 'string')) {
    throw new Error('incorrect sort type')
  }

  return {
    type: SET_SORT,
    payload: {
      type,
      state,
    },
  }
}
