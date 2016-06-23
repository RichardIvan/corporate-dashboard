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

const partials = combineReducers({
  byName: createPartialReducer('name'),
  byEmail: createPartialReducer('email_address'),
  byOpeningTimestamp: createPartialReducer('opening_timestamp'),
  byClosingTimestamp: createPartialReducer('closing_timestamp'),
  byEmployee: createPartialReducer('employee_name'),
  byOpenStatus: createPartialReducer('open_status'),
  byLocation: createPartialReducer('location'),
})

export default partials
