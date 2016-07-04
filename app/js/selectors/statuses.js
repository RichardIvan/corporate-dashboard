/* @flow */
'use strict'

// import uniq from 'lodash/uniq'
// import map from 'lodash/map'

import { OPEN_STATUS_TYPE } from '../actions/types'
import { getDataByType } from './'
import { Map } from 'immutable'

export function getAllStatuses(state) {
  const statusesMap = getDataByType(OPEN_STATUS_TYPE, state).reduce((acc, statusSet) => {
    return acc.set(statusSet.get(1), undefined)
  }, Map())
  const statuses = statusesMap.keySeq().toList()
  return statuses
}
