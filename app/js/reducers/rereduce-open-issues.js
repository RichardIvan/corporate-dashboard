/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map } from 'immutable'

import {
  SET_RANGE,
  PUSH_DATA,
  INIT_LOAD,
  DELETED_ISSUE
} from '../actions'

import issuesReducer from './rereduce-issues'
import rangeReducer from './range-reducer'

const openIssues = createReducer({ issuesReducer, rangeReducer },
  (state = new Map({ total: 0 }), action, { issuesReducer, rangeReducer }): Map => {
    const range = rangeReducer.get('range')

    switch (action.type) {
      case INIT_LOAD:
      case PUSH_DATA:
      case SET_RANGE: {
        if (range === 'all') {
          const total = issuesReducer.filter((issue) => {
            const status = issue.getIn(['open_status', 'original'])

            return status === true || status === 'true'
          })

          return state.set('total', total.count())
                      .set('issues', total)
        } else if (range === 'set') {
          const toRange = rangeReducer.get('to')

          // const from = moment(rangeReducer.get('from')).format('DD/MM/YYYY')
          // const to = moment(rangeReducer.get('to')).format('DD/MM/YYYY')

          const total = issuesReducer.filter((issue) => {
            const status = issue.getIn(['open_status', 'original'])
            if (status === false || status === 'false') {
              return false
            }

            const openingTime = issue.getIn(['opening_timestamp', 'original'])

            if (openingTime <= toRange) {
              return true
            }

            return false
          })

          return state.set('total', total.count())
                      .set('issues', total)
        }
        return state
      }
      case DELETED_ISSUE:
        const issue = action.payload.issue
        const id = issue.id
        if (state.get('issues').has(id)) {
          const currentTotal = state.get('total')
          return state.set('total', currentTotal > 0 ? currentTotal - 1 : 0)
                      .set('issues', state.get('issues').delete(id))
        }
        return state
      default:
        return state
    }
  }
)

export default openIssues
