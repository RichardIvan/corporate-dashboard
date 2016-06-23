/* @flow */
'use strict'

// import { Map, fromJS } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'

import { CHANGE_OFFSET } from '../actions'

export default function offset(state = 0, action): number {
  switch (action.type) {
  case CHANGE_OFFSET:
    return action.payload
  default:
    return state
  }
}
