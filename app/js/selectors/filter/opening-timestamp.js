/* @flow */
'use strict'

export function getFilter(state: Object, type: Object): Map {
  return state.filters[type]
}
