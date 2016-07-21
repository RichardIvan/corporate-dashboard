/* @flow */
'use strict'

import {
  isMobile
} from '../selectors'

import {
  setMobileState
} from '../actions'

export function setWindowSizeListener (store: Object) {
  return function () {
    window.onresize = (e) => {
      const state = isMobile(store.getState())
      const width = document.documentElement.clientWidth
      if (!state && width <= 425) {
        store.dispatch(setMobileState(true))
      } else if (state && width > 425) {
        store.dispatch(setMobileState(false))
      }
    }
  }
}
