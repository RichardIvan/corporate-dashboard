/* @flow */
'use strict'

// import uniq from 'lodash/uniq'
// import map from 'lodash/map'


import { NAME_TYPE } from '../actions/types'

import { getDataByType } from './'
import { Map, List } from 'immutable'

export function getAllNames(state: Object): List<string> {
  const namesMap = getDataByType(NAME_TYPE, state)
                    .reduce((acc, nameSet) =>
                      acc.set(nameSet.get(1), ), new Map())
  const names = namesMap.keySeq().toList()
  return names
}
