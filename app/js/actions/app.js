/* @flow */

'use strict'

import { INIT_LOAD, INIT_LOAD_SUCESS } from './constants.js'

export function initLoad(): { type: string } {
  return {
    type: INIT_LOAD,
  }
}

export function initSucess(): { type: string } {
  return {
    type: INIT_LOAD_SUCESS,
  }
}
