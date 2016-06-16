'use strict'

import { INITIAL_LOAD } from './constants.js'

export function initLoad() {
  return {
    type: INITIAL_LOAD,
  }
}
