'use strict'

import { Map, fromJS } from 'immutable'
import { transformCSVtoJSON, transformNewIssue } from './helpers.js'

import { INIT_LOAD, NEW_ISSUE } from '../actions'
// _.drop = drop
// _.flatten = flatten


export default function issues(state = Map({}), action) {
  switch (action.type) {
  case INIT_LOAD:
    if (action.payload) {
      const csv = action.payload.data
      const json = transformCSVtoJSON(csv)

      // console.log(state)

      return state.set('issues', fromJS(json))
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)
  case NEW_ISSUE: {
    const json = transformNewIssue(action.payload.data)
    const newState = state.mergeDeep({ issues: json })
    return newState
  }
  default:
    return state
  }
}
