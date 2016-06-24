'use strict'

import { combineReducers } from 'redux'
import { createPartialReducer } from './helpers'

// import byOpeningTimestamp from './by-opening-timestamp'
// import byClosingTimestamp from './by-closing-timestamp'
// import byName from './by-name'
// import byLocation from './by-location'
// import byEmail from './by-email'
// import byEmployee from './by-employee'
// import byOpenStatus from './by-open-status'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../actions'

const partials = combineReducers({
  [NAME_TYPE]: createPartialReducer('name'),
  [EMAIL_TYPE]: createPartialReducer('email_address'),
  [OPENING_TIMESTAMP_TYPE]: createPartialReducer('opening_timestamp'),
  [CLOSING_TIMESTAMP_TYPE]: createPartialReducer('closing_timestamp'),
  [EMPLOYEE_TYPE]: createPartialReducer('employee_name'),
  [OPEN_STATUS_TYPE]: createPartialReducer('open_status'),
  [LOCATION_TYPE]: createPartialReducer('location'),
})

export default partials
