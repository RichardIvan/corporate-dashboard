/* @flow */
'use strict'

export function getaFilter(state: Object, type: Object): Map {
  return state.filters[type]
}
