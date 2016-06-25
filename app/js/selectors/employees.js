/* @flow */
'use strict'

import uniq from 'lodash/uniq'

import { EMPLOYEE_TYPE } from '../actions/types'
import { getDataByType } from './'

export function getAllEmployees(state) {
  return uniq(getDataByType(EMPLOYEE_TYPE, state))
}
