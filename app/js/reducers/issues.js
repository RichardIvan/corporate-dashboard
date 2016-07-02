'use strict'

import { Map, fromJS } from 'immutable'
// import { transformCSVtoJSON, transformNewIssue } from './helpers.js'
// import { generateShortVersions } from '../helpers/generators'

import { INIT_LOAD, NEW_ISSUE } from '../actions'

export default function issues(state = Map(), action) {
  switch (action.type) {
  case INIT_LOAD:
    if (action.payload) {
      return state.merge(fromJS(action.payload.data))
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)
  case NEW_ISSUE: {
    return state.mergeDeep(fromJS(action.payload.data))
  }
  default:
    return state
  }
}
