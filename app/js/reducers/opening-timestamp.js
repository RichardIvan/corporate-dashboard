/* @flow */
'use strict'

import { List, fromJS } from 'immutable'
import { fillStateOnInitialLoad, fillStateOnNewIssue } from './helpers'

import { INIT_LOAD, PUSH_DATA } from '../actions'

const initialState = new Array(10).fill(List.of())

const issuesByTimeStampReducer = function(state: List = fromJS(initialState), action: Object): List {
  switch (action.type) {
  case INIT_LOAD:
    if (action.payload) {
      return fillStateOnInitialLoad(action.payload.data, 'opening_timestamp')
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)
  case PUSH_DATA: {
    return fillStateOnNewIssue(state, action.payload.data, 'opening_timestamp')
  }
  default:
    return state
  }
}

export default issuesByTimeStampReducer
