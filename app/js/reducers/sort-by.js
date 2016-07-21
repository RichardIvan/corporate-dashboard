/* @flow */
'use strict'

import { Map } from 'immutable'
import { SET_SORT, OPENING_TIMESTAMP_TYPE } from '../actions'

export const initialState = new Map({
  type: OPENING_TIMESTAMP_TYPE,
  asc: true,
})

export default function sortBy(state: Map = initialState, action: Object): Map {
  switch (action.type) {
  case SET_SORT:
    return (state.get('type') === action.payload.type)
            ? state.set('asc', !state.get('asc'))
            : state.set('type', action.payload.type).set('asc', true)
  default:
    return state
  }
}
