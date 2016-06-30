import { combineReducers } from 'redux'

import issues from './issues'
import partials from './partials'
import offset from './offset'
import filters from './filters'
import sortBy from './sort-by'
import filterComponentState from './filter-component-state'
import visibleIssues from './visible-items'

const root = combineReducers({
  issues,
  partials,
  offset,
  filters,
  sortBy,
  filterComponentState,
  visibleIssues,
})

export default root
