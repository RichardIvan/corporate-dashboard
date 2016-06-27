/* @flow */
'use strict'

export function isOpen(state) {
  return state.filterComponentState.get('open')
}

export function isComponentInInitialState(state) {
  return state.filterComponentState.get('selectedFilterMenu') === 'root'
}

export function getSelectedFilterMenu(state) {
  return state.filterComponentState.get('selectedFilterMenu')
}

export function getFilterSearchQuery(state) {
  return state.filterComponentState.get('filterSearchQuery')
}

export function getFilterSearchResults(state) {
  return state.filterComponentState.get('filterSearchQueryResults')
}

export function getFilterTimestamp(state, type) {
  return state.filterComponentState.getIn(['timestamp', type])
}
