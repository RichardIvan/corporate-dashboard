/* @flow */
'use strict'

import uniq from 'lodash/uniq'
import map from 'lodash/map'

import { NAME_TYPE } from '../actions/types'

import { getDataByType } from './'

export function getAllNames(state) {
  return uniq(
    map(getDataByType(NAME_TYPE, state), (namePair) => namePair[1])
  )
}
