/* @flow */
'use strict'

import { createReducer } from 'rereduce'

import {
  Map,
} from 'immutable'

import { CHANGE_VISIBLE_CHART } from '../actions'

const initialState = new Map({
  payingCustomersData: true,
  openIssuesData: true,
})

const visibleChartTypes = createReducer((state = initialState, action) => {
  // return state
  switch (action.type) {
  case CHANGE_VISIBLE_CHART:
    return state
  default:
    return state
  }
}
)

export default visibleChartTypes
