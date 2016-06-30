/* @flow */
'use strict'

// import { Map, fromJS } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
import { getTotalNumberOfVisibleItems } from '../selectors'

import { SET_OFFSET } from '../actions'

export default function offset(state: number = 0, action: Object): number {
  switch (action.type) {
  case SET_OFFSET:
    switch (action.payload.value) {
    case 'previous': {
      const newState = state
      return newState < 1 ? 0 : newState - 1
    }
    case 'next': {
      const newState = state
      return newState + 1
    }
    default: {
      const newState = action.payload.value
      return newState < 0 ? 0 : newState
    }
    }
  default:
    return state
  }
}
