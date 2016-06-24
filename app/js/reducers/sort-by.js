/* @flow */
'use strict'

import { Map } from 'immutable'
import { SET_SORT, OPENING_TIMESTAMP } from '../actions'

const initialState = Map({
  type: OPENING_TIMESTAMP,
  asc: true,
})

export default function sortBy(state: Map = initialState, action: Object): Map {
  switch (action.type) {
  case SET_SORT:
    return (state.get('type') === action.payload.type)
            ? state.set('type', !state.get('asc'))
            : state.set(action.payload)
  default:
    return state
  }
}
