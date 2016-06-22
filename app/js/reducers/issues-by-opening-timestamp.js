/* @flow */
'use strict'

import { List, fromJS } from 'immutable'

import { transformCSVtoJSON, transformNewIssue } from './helpers'

import map from 'lodash/map'

const initialState = new Array(10).fill(List.of())

const issuesByTimeStampReducer = function(state = fromJS(initialState), action) {
  switch (action.type) {
  case 'INIT_LOAD':
    if (action.payload) {
      const csv = action.payload.data
      const json = transformCSVtoJSON(csv)

      const results = map(json, (item) => List.of(item.id, item.opening_timestamp))
      const resultsLen = results.length

      if (resultsLen > 10 ) {
        const finalResult = List.of(results.take(10))
        return finalResult
      }

      const numberOfItemsToFill = 10 - resultsLen
      const missingItems = new Array(numberOfItemsToFill).fill(List.of())
      const finalResult = fromJS(results.concat(missingItems))

      return finalResult
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)
  case 'NEW_ISSUE': {
    const json = transformNewIssue(action.payload.data)
    const newState = state.mergeDeep(fromJS(json))
    return newState
  }
  default:
    return state
  }
}

export default issuesByTimeStampReducer
