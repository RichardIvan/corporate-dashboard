/* @flow */
'use strict'

// import { Map, fromJS } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
// import { getTotalNumberOfVisibleItems } from '../selectors'

import { Map } from 'immutable'

import { SET_OFFSET, SET_FILTER } from '../actions'

export default function offset(state: Map = new Map({ value: 0 }), action: Object): Map {
  switch (action.type) {
  case SET_OFFSET:
    switch (action.payload.value) {
    case 'previous': {
      const val = state.get('value')
      return val < 1 ? state.set('value', 0) : state.set('value', val - 1)
    }
    case 'next': {
      return state.set('value', state.get('value') + 1)
    }
    default: {
      const newState = action.payload.value
      return newState < 0 ? state.set('value', 0) : state.set('value', newState)
    }
    }
  case SET_FILTER:
    return state.set('value', 0)
  default:
    return state
  }
}
