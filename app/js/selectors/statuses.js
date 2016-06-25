/* @flow */
'use strict'

import uniq from 'lodash/uniq'
import map from 'lodash/map'

import { OPEN_STATUS_TYPE } from '../actions/types'
import { getDataByType } from './'

export function getAllStatuses(state) {
  return uniq(
    map(getDataByType(OPEN_STATUS_TYPE, state), (statusPair) => statusPair[1])
  )
}
