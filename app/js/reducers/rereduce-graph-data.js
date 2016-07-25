 /* @flow */
'use strict'

import moment from 'moment'
import reduce from 'lodash/reduce'

import { createReducer } from 'rereduce'

import { Map, fromJS } from 'immutable'
import {
  INIT_LOAD,
  PUSH_DATA,
  DELETED_ISSUE,
  SET_GRAPH_DATA_PENDING_STATE
} from '../actions'

import {
  addOpenIssuesData,
  fillIssues,
  constructPath
} from './graph-data/helpers'

import {
  getLowestDate,
  getHighestDate,
  getDatesInRange
} from '../selectors/graph-data-helpers/general-graph-data-helpers'

export const initialState = Map({ data: Map(), pending: false })

const graphData = createReducer((state = initialState, action) => {
  switch (action.type) {
    case INIT_LOAD: {
      // console.log(action.payload)
      let newState = state.set('data', fromJS(action.payload.payingCustomersData))
      const transformedState = addOpenIssuesData(newState, action.payload.data)

      newState = transformedState.setIn(['info', 'lowestDate'], getLowestDate(transformedState.get('data')))
                                  .setIn(['info', 'highestDate'], getHighestDate(transformedState.get('data')))

      return newState
    }
    case PUSH_DATA: {
      let newState = state
      const requiredData = ['payingCustomersData', 'openIssuesData']
      const path = ['data']
      path.concat(moment().format('YY/MM/DD').split('/'))

      requiredData.forEach((type) => {
        if (type === 'payingCustomersData') {
          // #TODO #FIX

          const newValue = fromJS(action.payload.payingCustomersData).getIn(path.splice(1))
          // console.log(newValue.toJS())
          // return newState
          const currentVal = state.getIn(path.concat(type)) + newValue
          return currentVal < 0
                      ? newState.setIn(path, 0)
                      : newState.setIn(path, currentVal)
        } else if (type === 'openIssuesData') {
          newState = reduce(action.payload.data, (acc, issue) => {
            // setLowerstDate(acc, issue)
            // setHighestDate(acc, issue)
            return fillIssues(acc, issue)
          }, newState)
        }
      })

      return newState
    }
    case DELETED_ISSUE:
      const issue = action.payload.issue
      const id = issue.id
      const openingTimestamp = +issue.opening_timestamp
      let closingTimestamp = issue.closing_timestamp

      const date = moment().format('x')

      closingTimestamp = closingTimestamp === '' ? +date : +closingTimestamp

      const range = Map({
        from: openingTimestamp,
        to: closingTimestamp
      })

      const dates = getDatesInRange(range)

      // const oldDate = state.get('data')
      let newState = dates.reduce((acc, date) => {
        const p = ['data']
        const path = constructPath(p, date)
        const entry = acc.getIn(path)
        if (entry && entry.has(id)) {
          return acc.setIn(path, entry.delete(id))
        }
        return acc
      }, state)

      // const p = ['data']
      // const path = constructPath(p, date)
      // console.log(path)
      // const entry = state.getIn(path)
      // console.log(entry)
      // if (entry.has(id)) {
      //   return state.setIn(path, entry.delete(id))
      // }
      return newState
    case SET_GRAPH_DATA_PENDING_STATE:
      return state.set('pending', action.payload.value)
    default:
      return state
  }
})

export default graphData
