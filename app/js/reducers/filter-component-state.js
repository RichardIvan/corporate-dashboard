/* @flow */
'use strict'

import { Map } from 'immutable'

import {
  SET_FILTER_COMPONENT_OPEN_STATUS,
} from '../actions'

export const initialState = Map({
  open: false,
  selectedFilterMenu: 'root',
})

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_FILTER_COMPONENT_OPEN_STATUS:
    return state.set('open', action.payload)
  default:
    return state
  }
}
