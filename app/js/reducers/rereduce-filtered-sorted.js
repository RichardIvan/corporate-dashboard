/* @flow */
'use strict'

// import { Map } from 'immutable'
// import { SET_SORT, OPENING_TIMESTAMP_TYPE } from '../actions'

import { createReducer } from 'rereduce'

import { List, fromJS } from 'immutable'

import filteredIssuesReducer from './rereduce-filtered'
import sortByReducer from './rereduce-sort-by'

import {
  INIT_LOAD,
  NEW_ISSUE,
  SET_FILTER,
  SET_SORT,
  RESET_FILTERS,
} from '../actions'

export const initialState = fromJS(new Array(10).fill(List.of()))

const filteredSorted = createReducer({ filteredIssuesReducer, sortByReducer },
  (state = initialState, action, { filteredIssuesReducer, sortByReducer }) => {

    // case INIT_LOAD:
    // case NEW_ISSUE:
    // case SET_FILTER:
//   if (filteredIssuesReducer.isEmpty()) {
//     return state
//   }

  switch (action.type) {
  case INIT_LOAD:
  case NEW_ISSUE:
  case SET_FILTER:
  case RESET_FILTERS:
  case SET_SORT: {
    const sorted = filteredIssuesReducer.sortBy((item) => {
      console.log(item)
      return item.getIn([sortByReducer.get('type'), 'original'])
    })
    return sortByReducer.get('asc') ? sorted : sorted.reverse()
    // console.log('run sorted!!!')
  }
  default: {
    return state
  }

    // return state
  }


  // partial.forEach(item => console.log(item))
  //
  // // let partial = slice(sortedData, start, start + 10)
  // while (partial.count() < 10 ) {
  //   partial = partial.push(List.of())
  // }
  // console.log(partial)
  // return partial
})

export default filteredSorted

// export default function sortBy(state: Map = initialState, action: Object): Map {
//   switch (action.type) {
//   case SET_SORT:
//     return (state.get('type') === action.payload.type)
//             ? state.set('asc', !state.get('asc'))
//             : state.set('type', action.payload.type).set('asc', true)
//   default:
//     return state
//   }
// }
//
// if (filteredData.isEmpty()) {
//   return List.of()
// }
//
// const sorted = filteredData.sortBy((item) => item.getIn([sortBy.type, 'original']))
// // ImmutableSorted.forEach((item) => console.log(item.getIn([sortBy.type, 'original'])))
//
// // console.log(ImmutableSorted)
//
// // const sorted = orderBy(filteredData, (item) => {
// //   console.log(item)
// //   // console.log(item.getIn(sortBy.type, 'original'))
// //   return item[sortBy.type].original
// // }, [sortBy.asc ? 'asc' : 'desc'])
//
// console.log(sortBy.asc ? sorted : sorted.reverse())
//
// return sortBy.asc ? sorted : sorted.reverse()

// (offset, sortedData) => {
//   let start
//   if (offset === 0) {
//     start = 0
//   } else {
//     start = offset * 10
//   }
//
//   let partial = sortedData.slice(start, start + 10)
//
//   // let partial = slice(sortedData, start, start + 10)
//   while (partial.count() < 10 ) {
//     partial = partial.push(List.of())
//   }
//   return partial
// }
 // }
