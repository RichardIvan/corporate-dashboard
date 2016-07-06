/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map } from 'immutable'

import {
  SET_RANGE,
  NEW_ISSUE,
  INIT_LOAD,
} from '../actions'

import issuesReducer from './rereduce-issues'
import rangeReducer from './range-reducer'

const openIssues = createReducer({ issuesReducer, rangeReducer },
  (state = Map({ total: 0 }), action, { issuesReducer, rangeReducer }): Map => {
    const range = rangeReducer.get('range')

    switch (action.type) {
    case INIT_LOAD:
    case NEW_ISSUE:
    case SET_RANGE: {
      if (range === 'all') {
        const total = issuesReducer.filter((issue) => {
          const status = issue.getIn(['open_status', 'original'])

          return status === true || status === 'true'
        })

        return state.set('total', total.count())
      } else if (range === 'set') {
        const toRange = rangeReducer.get('to')

        const total = issuesReducer.filter((issue) => {
          const status = issue.get('open_status')
          if (status === false || status === 'false') {
            return false
          }

          const openingTime = issue.get('opening_timestamp')

          if (openingTime <= toRange) {
            return true
          }

          return false
        })

        return state.set('total', total.count())
      }
      return state
    }
    default:
      return state
    }
})

export default openIssues
