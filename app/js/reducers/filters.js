/* @flow */
'use strict'

import { Map } from 'immutable'

import {
  SET_FILTER,
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../actions'

const initialState = Map({
  [NAME_TYPE]:  Map({
    active: false,
    by: '',
  }),
  [EMAIL_TYPE]: Map({
    active: false,
    by: '',
  }),
  [OPENING_TIMESTAMP_TYPE]: Map({
    active: false,
    from: -1,
    to: -1,
  }),
  [CLOSING_TIMESTAMP_TYPE]: Map({
    active: false,
    from: -1,
    to: -1,
  }),
  [EMPLOYEE_TYPE]: Map({
    active: false,
    by: '',
  }),
  [OPEN_STATUS_TYPE]: Map({
    active: false,
    by: true,
  }),
  [LOCATION_TYPE]: Map({
    active: false,
    by: '',
  }),
})

export default function filters(state: Map = initialState, action: Object): Map {
  switch (action.type) {
  case SET_FILTER:
    return state.setIn(action.payload.type, action.payload.data)
  default:
    return state
  }
}
