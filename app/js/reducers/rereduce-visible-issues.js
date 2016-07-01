/* @flow */
'use strict'

// import { Map } from 'immutable'
// import { SET_SORT, OPENING_TIMESTAMP_TYPE } from '../actions'

import { createReducer } from 'rereduce'

import { List } from 'immutable'

import filteredIssuesReducer from './rereduce-filtered'
import offsetReducer from './rereduce-offset'
import sortByReducer from './rereduce-sort-by'


export const initialState = List.of(new Array(10))

const visibleIssues = createReducer({ filteredIssuesReducer, offsetReducer, sortByReducer },
  (state = initialState, action, { filteredIssuesReducer, offsetReducer, sortByReducer }) => {

  let sorted = filteredIssuesReducer.sortBy((item) => item.getIn([sortByReducer.get('type'), 'original']))
  sorted = sortByReducer.get('asc') ? sorted : sorted.reverse()

  const start = offsetReducer.get('value')
  const partial = sorted.slice(start, start + 10)
  const diff = 10 - partial.count()

  if( diff > 0) {
    console.log(partial.concat(new Array(diff)).count())
    return partial.concat(new Array(diff))
  }

  return partial
  // partial.forEach(item => console.log(item))
  //
  // // let partial = slice(sortedData, start, start + 10)
  // while (partial.count() < 10 ) {
  //   partial = partial.push(List.of())
  // }
  // console.log(partial)
  // return partial
})

export default visibleIssues

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
