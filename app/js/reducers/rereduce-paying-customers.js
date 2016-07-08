/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import { Map, fromJS } from 'immutable'
import {
  INIT_LOAD,
} from '../actions'

const payingCustomersReducer = createReducer((state = Map(), action) => {
  switch (action.type) {
  case INIT_LOAD:
    return state.set('data', fromJS(action.payload.payingCustomersData))
  default:
    return state
  }
})

export default payingCustomersReducer
