/* @flow */
'use strict'

import { OPENING_TIMESTAMP_TYPE } from '../actions'

export function getFilter(state, type) {
  if (!type) {
    throw new Error('No type provided')
  }
  return state.filters[type]
}
