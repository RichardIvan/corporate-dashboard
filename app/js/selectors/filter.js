/* @flow */
'use strict'

export function getFilter(type: string, state: Object): Map {
  if (!type) {
    throw new Error('No type provided')
  }
  return state.filters.get(type).toJS()
}

export function getAllFilters(state) {
  return state.filters.toJS()
}
