/* @flow */
'use strict'

// NOTE uses rereduce recuer | use value

import { Map, List } from 'immutable'

export function getOpenIssuesTotal(state: Object): Map {
  return state.numberOfOpenIssues.value
}

export function getOpenIssuesInRange(data: Map, range: Map, type: string): List<Map> {
  return
}
