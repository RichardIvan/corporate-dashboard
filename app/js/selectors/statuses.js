/* @flow */
'use strict'

import uniq from 'lodash/uniq'

import { OPEN_STATUS_TYPE } from '../actions/types'
import { getDataByType } from './'

export function getAllStatuses(state) {
  return uniq(getDataByType(OPEN_STATUS_TYPE, state))
}
