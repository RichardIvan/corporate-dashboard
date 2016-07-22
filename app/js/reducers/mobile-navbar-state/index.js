/* @flow */
'use strict'

import {
  Map
} from 'immutable'

import {
  MOBILE_NAVBAR_STATE_CHANGE
} from '../../actions'

export function mobileNavbarState (state = Map({ state: false }), action: Object): Map {
  switch (action.type) {
    case MOBILE_NAVBAR_STATE_CHANGE:
      return state.set('state', action.payload.state.value)
    default:
      return state
  }
}

export default mobileNavbarState
