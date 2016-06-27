/* @flow */
'use strict'

import { Map, List, fromJS } from 'immutable'

import {
  SET_FILTER_COMPONENT_OPEN_STATUS,
  SET_FILTER_COMPONENT_MENU_STATE,
  RESET_FILTER_COMPONENT_STATE,
  CLOSE_FILTER_COMPONENT,
  OVERLAY_CLOSED,
  SET_FILTER,
  FILTER_SEARCH_RESULT,
} from '../actions'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  DESCRIPTION_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../actions/types'

export const initialState = Map({
  open: false,
  selectedFilterMenu: 'root',
  filterSearchQuery: '',
  filterSearchQueryResults: List.of(),
  timestamp: Map({
    from: 0,
    to: 0,
  }),
})

export default function(state: Map = initialState, action) {
  switch (action.type) {
  case SET_FILTER_COMPONENT_OPEN_STATUS:
    return state.set('open', action.payload)
  case SET_FILTER_COMPONENT_MENU_STATE:
    return state.set('selectedFilterMenu', action.payload)
  case RESET_FILTER_COMPONENT_STATE:
  case CLOSE_FILTER_COMPONENT:
  case OVERLAY_CLOSED:
    return initialState
  case SET_FILTER:
    switch (action.payload.type) {
    case OPENING_TIMESTAMP_TYPE:
    case CLOSING_TIMESTAMP_TYPE:
      return state.setIn(['timestamp', action.payload.timestampType], action.payload.value)
    default:
      return state
    }
  case FILTER_SEARCH_RESULT:
    switch (action.payload.type) {
    case NAME_TYPE:
    case EMAIL_TYPE:
    case EMPLOYEE_TYPE:
    case LOCATION_TYPE:
      return state.set('filterSearchQuery', action.payload.term)
              .set('filterSearchQueryResults', fromJS(action.payload.results))
    default:
      return state
    }
  default:
    return state
  }
}
