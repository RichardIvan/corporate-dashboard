/* @flow */
'use strict'

import uniq from 'lodash/uniq'
import map from 'lodash/map'

import { EMPLOYEE_TYPE } from '../actions/types'
import { getDataByType } from './'

export function getAllEmployees(state) {
  return uniq(
    map(getDataByType(EMPLOYEE_TYPE, state), (emplPair) => emplPair[1])
  )
}
