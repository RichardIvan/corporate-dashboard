/* @flow */
'use strict'

import moment from 'moment'

import { createReducer } from 'rereduce'

import { Map, fromJS } from 'immutable'
import {
  INIT_LOAD,
  PUSH_DATA,
} from '../actions'

const payingCustomersReducer = createReducer((state = Map(), action) => {
  switch (action.type) {
  case INIT_LOAD:
    return state.set('data', fromJS(action.payload.payingCustomersData))
  case PUSH_DATA: {
    const path = moment().format('YY/MM/DD').split('/')
    const newValue = fromJS(action.payload.payingCustomersData).getIn(path)
    const currentStatePath = ['data'].concat(path)
    const currentVal = state.getIn(currentStatePath) + newValue

    return currentVal < 0 ? 0 : state.setIn(currentStatePath, currentVal)
  }
  default:
    return state
  }
})

export default payingCustomersReducer
