/* @flow */
'use strict'

// import uniq from 'lodash/uniq'
// import map from 'lodash/map'

import { NAME_TYPE } from '../actions/types'

import { getDataByType } from './'
import { Map } from 'immutable'

export function getAllNames(state) {
  const namesMap = getDataByType(NAME_TYPE, state).reduce((acc, nameSet) => {
    return acc.set(nameSet.get(1), undefined)
  }, Map())
  const names = namesMap.keySeq().toList()
  return names
}
