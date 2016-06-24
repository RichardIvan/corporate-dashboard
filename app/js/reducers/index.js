import { combineReducers } from 'redux'

import issues from './issues'
import partials from './partials'
import offset from './offset'
import filters from './filters'
import sortBy from './sort-by'

const root = combineReducers({
  issues,
  partials,
  offset,
  filters,
  sortBy,
})

export default root
