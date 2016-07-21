/* @flow */
'use strict'

import {
  MOBILE_NAVBAR_STATE_CHANGE
} from '../actions/constants'

export function setMobileNavbarOpenState (value) {
  return {
    type: MOBILE_NAVBAR_STATE_CHANGE,
    payload: {
      state: {
        value
      }
    }
  }
}
