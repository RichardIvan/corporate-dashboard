/* @flow */
'use strict'

import { Map } from 'immutable'

import { SET_FILTER, RESET_FILTER } from '../actions'
import { initialState } from './filters-helpers'

export default function filters(state: Map = initialState, action: Object): Map {
  switch (action.type) {
  case SET_FILTER:
    return state.setIn(action.payload.type, action.payload.data)
  case RESET_FILTER:
    return state.setIn(action.payload.type, initialState.get(action.payload.type))
  default:
    return state
  }
}
