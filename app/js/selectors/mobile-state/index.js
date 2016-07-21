/* @flow */
'use strict'

export function isMobile (state) {
  return state.mobileState.get('state')
}
