/* @flow */
'use strict'

import { Map, List ,fromJS } from 'immutable'

import { SET_FILTER, RESET_FILTERS } from '../actions'
import { initialState } from './filters-helpers'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  EMPLOYEE_TYPE,
  LOCATION_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  FILTER_SEARCH_RESULT,
} from '../actions/types'

export default function filters(state: Map = initialState, action: Object): Map {
  switch (action.type) {
  case SET_FILTER:
  case FILTER_SEARCH_RESULT:
    const filterType = action.payload.type
    switch (filterType) {
    case NAME_TYPE:
    case EMAIL_TYPE:
    case EMPLOYEE_TYPE:
    case LOCATION_TYPE:
      const arr = state.getIn([filterType, 'by'])
      const value = action.payload.value
      if (arr.contains(value)) {
        if (arr.pop(value).count() === 0) {
          return state.setIn([filterType, 'active'], false)
                  .setIn([filterType, 'by'], arr.delete(arr.indexOf(value)))
        } else {
          return state.setIn([filterType, 'by'], arr.delete(arr.indexOf(value)))
        }
      } else {
        return state.setIn([filterType, 'active'], true)
                .setIn([filterType, 'by'], arr.push(value))
      }
    case OPENING_TIMESTAMP_TYPE:
    case CLOSING_TIMESTAMP_TYPE:
      const type = action.payload.type
      const timestamp = action.payload.value
      if (!timestamp) {
        return state.setIn([type, 'timestamp'], timestamp)
                .setIn([type, 'active'], false)
      } else {
        return state.setIn([type, 'timestamp'], timestamp)
                .setIn([type, 'active'], true)
      }
    default:
      return state.setIn([action.payload.type], fromJS(action.payload.data))
    }
  case RESET_FILTERS:
    return initialState
  default:
    return state
  }
}
