import { combineReducers } from 'redux'

// import issues from './issues'
import issues from './rereduce-issues'

import partials from './partials'
import offset from './rereduce-offset'
// import offset from './offset'
// import filters from './filters'
import filters from './rereduce-filter'

import filteredIssues from './rereduce-filtered'
import filteredSorted from './rereduce-filtered-sorted'

import sortBy from './rereduce-sort-by'
// import sortBy from './sort-by'
import filterComponentState from './filter-component-state'

import visibleIssues from './rereduce-visible-issues'
// import visibleIssues from './visible-items'

import numberOfOpenIssues from './rereduce-open-issues'
import graphRange from './range-reducer.js'

import graphData from './rereduce-graph-data'
import visibleChartTypes from './rereduce-visible-charts'

import locationList from './location-list/reducer'

import mobileState from './mobile-state'
import mobileNavbarState from './mobile-navbar-state'

const root = combineReducers({
  issues,
  filters,
  filteredIssues,
  filteredSorted,
  partials,
  offset,
  sortBy,
  filterComponentState,
  visibleIssues,
  numberOfOpenIssues,
  graphRange,
  graphData,
  visibleChartTypes,
  locationList,
  mobileState,
  mobileNavbarState
})

export default root
