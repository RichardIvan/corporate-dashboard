/* @flow */
'use strict'

import { Map, List ,fromJS } from 'immutable'

import {
  SET_FILTER,
  RESET_FILTERS,
} from '../actions'

import { initialState } from './filters-helpers'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  EMPLOYEE_TYPE,
  LOCATION_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  OPEN_STATUS_TYPE,
} from '../actions/types'

export default function filters(state: Map = initialState, action: Object): Map {
  switch (action.type) {
  // case FILTER_SEARCH_RESULT: {
  //   const fType = action.payload.type
  //   const ar = state.getIn([fType, 'by'])
  //   const val = action.payload.value
  //   let newState
  //
  //   if( val === '' && ar.count() === 1 && ar.has(previousTerm) ) {
  //     newState = state.setIn([fType, 'active'], false)
  //     .setIn([fType, 'by'], List.of())
  //   } else {
  //     newState = state.setIn([fType, 'active'], true)
  //             .setIn([fType, 'by'], ar.delete(ar.indexOf(previousTerm)).push(val))
  //   }
  //
  //   previousTerm = val
  //   return newState
  // }
    // we need to store here the previous value we enetered
    // and compare the new and old one
    // so we can figure out if we need to remove the old one
    // or add the old one from the filter

  case SET_FILTER: {
    const filterType = action.payload.type
    switch (filterType) {
    case NAME_TYPE:
    case EMAIL_TYPE:
    case EMPLOYEE_TYPE:
    case LOCATION_TYPE: {
      const arr = state.getIn([filterType, 'by'])
      const value = action.payload.value
      if (arr.contains(value)) {
        if (arr.pop(value).count() === 0) {
          return state.setIn([filterType, 'active'], false)
                  .setIn([filterType, 'by'], arr.delete(arr.indexOf(value)))
        }
        return state.setIn([filterType, 'by'], arr.delete(arr.indexOf(value)))
      }
      return state.setIn([filterType, 'active'], true)
              .setIn([filterType, 'by'], arr.push(value))
    }
    case OPENING_TIMESTAMP_TYPE:
    case CLOSING_TIMESTAMP_TYPE: {
      const type = action.payload.type
      const timestamp = action.payload.value
      if (!timestamp) {
        return state.setIn([type, 'timestamp'], timestamp)
                .setIn([type, 'active'], false)
      }
      return state.setIn([type, 'timestamp'], timestamp)
              .setIn([type, 'active'], true)
    }
    case OPEN_STATUS_TYPE: {
      const payladType = action.payload.type
      const status = action.payload.value === 'open'
      return state.setIn([payladType, 'by'], status)
              .setIn([payladType, 'active'], status)
    }
    default:
      return state
    }
  }
  case RESET_FILTERS:
    return initialState
  default:
    return state
  }
}
