/* @flow */
'use strict'

import { SET_ACTIVE_LOCATION } from '../actions'

export function setActiveLocation (location: string): Object {
  return {
    type: SET_ACTIVE_LOCATION,
    payload: {
      value: location
    }
  }
}
