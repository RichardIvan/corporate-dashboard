/* @flow */
'use strict'

export function getFilter(state: Object, type: string): Map {
  if (!type) {
    throw new Error('No type provided')
  }
  return state.filters[type]
}
