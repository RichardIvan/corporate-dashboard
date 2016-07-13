/* @flow */
'use strict'

import {
  List,
} from 'immutable'

export function getLocations(state: Object): List {
  if (!state) {
    throw new Error('missing state argument')
  }
  return state.locations
}
