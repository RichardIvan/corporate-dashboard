/* @flow */
'use strict'

import { List, fromJS } from 'immutable'
import { fillStateOnInitialLoad, fillStateOnNewIssue } from './helpers'

const initialState = new Array(10).fill(List.of())

const issuesByTimeStampReducer = function(state = fromJS(initialState), action) {
  switch (action.type) {
  case 'INIT_LOAD':
    if (action.payload) {
      return fillStateOnInitialLoad(action.payload.data, 'opening_timestamp')
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)
  case 'NEW_ISSUE': {
    return fillStateOnNewIssue(state, action.payload.data, 'opening_timestamp')
  }
  default:
    return state
  }
}

export default issuesByTimeStampReducer
