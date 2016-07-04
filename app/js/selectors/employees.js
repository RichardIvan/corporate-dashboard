/* @flow */
'use strict'

// import uniq from 'lodash/uniq'
// import map from 'lodash/map'

import { Map } from 'immutable'

import { EMPLOYEE_TYPE } from '../actions/types'
import { getDataByType } from './'

export function getAllEmployees(state) {
  const employeeMap = getDataByType(EMPLOYEE_TYPE, state).reduce((acc, emplSet) => {
    return acc.set(emplSet.get(1), undefined)
  }, Map())
  const employee = employeeMap.keySeq().toList()
  return employee
}
