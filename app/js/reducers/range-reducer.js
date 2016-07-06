/* @flow */
'use strict'

import moment from 'moment'

import { Map } from 'immutable'

import { SET_RANGE } from '../actions'

import { createReducer } from 'rereduce'

export const initialState = Map({
  range: 'all',
  from: +moment().startOf('day').subtract(7, 'days').format('x'),
  to: +moment().startOf('day').format('x'),
})

const rangeReducer = createReducer((state = initialState, action) => {
  if (!action.payload) {
    return state
  }
  switch (action.type) {
  case SET_RANGE: {
    const payload = action.payload
    const range = payload.range
    switch (range) {
    case 'set':
      return Map({
        range: 'set',
        from: payload.from,
        to: payload.to,
      })
    case 'all':
      return state.merge({ range: 'all' })
    default:
      return state
    }
  }
  default:
    return state
  }
})

export default rangeReducer
