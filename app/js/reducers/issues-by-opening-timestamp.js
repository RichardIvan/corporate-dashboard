/* @flow */
'use strict'

import { List, fromJS } from 'immutable'

import { transformCSVtoJSON, transformNewIssue } from './helpers'

import map from 'lodash/map'
import take from 'lodash/take'
import sortBy from 'lodash/sortBy'

const initialState = new Array(10).fill(List.of())

const issuesByTimeStampReducer = function(state = fromJS(initialState), action) {
  switch (action.type) {
  case 'INIT_LOAD':
    if (action.payload) {
      const csv = action.payload.data
      const json = transformCSVtoJSON(csv)

      const results = map(json, (item) => List.of(item.id, parseInt(item.opening_timestamp, 10)))
      const resultsLen = results.length

      if (resultsLen > 10 ) {
        const finalResult = fromJS(sortBy(results, (pair) => pair.get(1), 'asc'))
        return finalResult.take(10)
      }

      const numberOfItemsToFill = 10 - resultsLen
      const missingItems = new Array(numberOfItemsToFill).fill(List.of())

      const sortedFinalResult = fromJS(
        sortBy(results, (pair) => pair.get(1), 'asc')
        .concat(missingItems)
      ).take(10)

      return sortedFinalResult
    }
    return state
    // console.log(state.merge(fromJS(action.payload)))
    // const newState = state.merge({issues: fromJS(action.payload)})
    // console.log(newState)
  case 'NEW_ISSUE': {
    const json = fromJS(transformNewIssue(action.payload.data))

    const newState = json.reduce((accumulator, item) => {
      const newItem = fromJS([ item.get('id'), item.get('opening_timestamp') ])
      return accumulator.push(newItem)
    }, state)

    // const sorted = sortBy(newState.toJS(), (item) => item[1], ['asc']).length
    const sortedNewState = fromJS(
      sortBy(newState.toArray(), (item) => item.get(1), ['asc'])
    ).take(10)
    
    return sortedNewState
  }
  default:
    return state
  }
}

export default issuesByTimeStampReducer
