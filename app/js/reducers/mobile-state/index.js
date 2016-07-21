/* @flow */
'use strict'

import { Map } from 'immutable'

import {
  MOBILE_STATE_CHANGE
} from '../../actions'

const setupInitialState = () => {
  const currentValue = Map({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  })

  let state
  if (currentValue.get('width') <= 425) {
    state = true
  } else {
    state = false
  }

  return Map({
    state
  })
}

export const initialState = setupInitialState()

export function MobileState (state: Map = initialState, action: Object): Map {
  switch (action.type) {
    case MOBILE_STATE_CHANGE:
      return state.set('state', action.payload.state.value)
    default:
      return state
  }
}

export default MobileState
