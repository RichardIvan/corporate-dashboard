/* @flow */
'use strict'

import { Map } from 'immutable'
import { SET_SORT, OPENING_TIMESTAMP_TYPE } from '../actions'

import { createReducer } from 'rereduce'

export const initialState = Map({
  type: OPENING_TIMESTAMP_TYPE,
  asc: true,
})

const sortBy = createReducer((state = initialState, action) => {
  switch (action.type) {
  case SET_SORT:
    return (state.get('type') === action.payload.type)
            ? state.set('asc', !state.get('asc'))
            : state.set('type', action.payload.type).set('asc', true)
  default:
    return state
  }
})

export default sortBy
//
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
