/* @flow */
'use strict'

export function getFilter(state, type) {
  if (!type) {
    throw new Error('No type provided')
  }
  return state.filters[type]
}
