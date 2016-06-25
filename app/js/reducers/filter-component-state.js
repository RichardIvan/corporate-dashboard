/* @flow */
'use strict'

import { Map } from 'immutable'

import {
  SET_FILTER_COMPONENT_OPEN_STATUS,
  SET_FILTER_COMPONENT_STATE,
  RESET_FILTER_COMPONENT_STATE,
  OVERLAY_CLOSED,
} from '../actions'

export const initialState = Map({
  open: false,
  selectedFilterMenu: 'root',
})

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_FILTER_COMPONENT_OPEN_STATUS:
    return state.set('open', action.payload)
  case SET_FILTER_COMPONENT_STATE:
    return state.set('selectedFilterMenu', action.payload)
  case RESET_FILTER_COMPONENT_STATE:
    return state.set('selectedFilterMenu', 'root')
  case OVERLAY_CLOSED:
    return initialState
  default:
    return state
  }
}
