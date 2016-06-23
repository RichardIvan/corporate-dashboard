/* @flow */
'use strict'

export function getFilter(state, type) {
  return state.filters[type]
}
