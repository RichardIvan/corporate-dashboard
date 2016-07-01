/* @flow */
'use strict'

import { Map, List } from 'immutable'

export function getIssues(state): Map {
  return state.issues
}

export function getAllFilteredIssues(state): List {
  return state.filteredIssues.value
}
