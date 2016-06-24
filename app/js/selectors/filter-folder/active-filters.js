/* @flow */
'use strict'

import filter from 'lodash/filter'

export function getActiveFilters(state: Object): Array<Object> {
  return filter(state.filters.toJS(), (filterObject) => filterObject.active)
}
