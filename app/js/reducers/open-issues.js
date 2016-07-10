/* @flow */
'use strict'

// this reducer is dependent on open issues by range

// this reducer is dependent on range reducer
// if range is all, it sets the total from all the issues that it depends on as well

import { createReducer } from 'rereduce'

import { Map } from 'immutable'

import {
  SET_RANGE,
  PUSH_DATA,
  INIT_LOAD,
} from '../actions'

// import issuesReducer from './rereduce-issues'
// import rangeReducer from './range-reducer'
// import filteredByRangeReducer from './filtered-by-range-reducer'

// const openIssues = createReducer({ issuesReducer},
//   (state = Map({ total: 0 }), action, { issuesReducer }): Map => {
//
//   console.log(issuesReducer)
//
//   const total = issuesReducer.filter((issue) => {
//     console.log(issue)
//     const status = issue.get('open_status')
//
//     return status || status === 'true'
//   }).count()
//
//   console.log(total)
//     // should redraw on
//     // change range
//     // new issue
//     // initial load
//
//   return state
// })

// { issuesReducer, rangeReducer, filteredByRangeReducer }
export default function openIssues(state = Map({ total: 0 }), action) {
  // for test
  const issuesReducer = action.issuesReducer
  const rangeReducer = action.rangeReducer
  // for test

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
    }
    return state
  }
  default:
    return state
  }
}
