/* @flow */
'use strict'

import { Map } from 'immutable'

import {
  SET_OPEN_STATUS
} from '../actions'

export const initialState = Map({
  open: false,
  selectedFilterMenu: 'root',
})

export default function(state = initialState, action) {
  switch (action.type) {
  case SET_OPEN_STATUS:
    return state
  default:
    return state
  }
}
