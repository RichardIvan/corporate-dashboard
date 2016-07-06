/* @flow */
'use strict'

// NOTE uses rereduce recuer | use value

export function getOpenIssuesTotal(state: Object): Map {
  return state.numberOfOpenIssues.value
}
