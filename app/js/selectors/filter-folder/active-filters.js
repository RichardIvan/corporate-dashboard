/* @flow */
'use strict'

export function getActiveFilters(state: Object): Array<Object> {
  return state.filters.filter((item) => item.get('active'))
  // return filter(state.filters, (filterObject) => filterObject.get('active'))
}
