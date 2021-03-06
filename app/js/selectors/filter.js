/* @flow */
'use strict'

export function getFilter(type: string, state: Object): Map {
  if (!type) {
    throw new Error('No type provided')
  }
//   console.log(state.filters)
  return state.filters.get(type)
}

export function getAllFilters(state: Object): Array<Object> {
  return state.filters
}
