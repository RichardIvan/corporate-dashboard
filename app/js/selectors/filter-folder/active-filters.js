/* @flow */
'use strict'

import filter from 'lodash/filter'
import map from 'lodash/map'

export function getActiveFilters(state: Object): Array<Object> {
  return state.filters.toSeq().filter((item) => item.get('active')).toJS()
  // return filter(state.filters, (filterObject) => filterObject.get('active'))
}
