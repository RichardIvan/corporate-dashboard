/* @flow */
'use strict'

import { Map, List } from 'immutable'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../actions'

export const initialState = Map({
  [NAME_TYPE]:  Map({
    type: NAME_TYPE,
    active: false,
    by: List.of(),
  }),
  [EMAIL_TYPE]: Map({
    type: EMAIL_TYPE,
    active: false,
    by: List.of(),
  }),
  [OPENING_TIMESTAMP_TYPE]: Map({
    type: OPENING_TIMESTAMP_TYPE,
    active: false,
    timestamp: 0,
  }),
  [CLOSING_TIMESTAMP_TYPE]: Map({
    type: CLOSING_TIMESTAMP_TYPE,
    active: false,
    timestamp: 0,
  }),
  [EMPLOYEE_TYPE]: Map({
    type: EMPLOYEE_TYPE,
    active: false,
    by: List.of(),
  }),
  [OPEN_STATUS_TYPE]: Map({
    type: OPEN_STATUS_TYPE,
    active: false,
    by: true,
  }),
  [LOCATION_TYPE]: Map({
    type: LOCATION_TYPE,
    active: false,
    by: List.of(),
  }),
})
