/* @flow */
'use strict'

import uniq from 'lodash/uniq'

import { NAME_TYPE } from '../actions/types'

import { getDataByType } from './'

export function getAllNames(state) {
  return uniq(getDataByType(NAME_TYPE, state))
}
