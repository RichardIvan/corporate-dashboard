/* @flow */
'use strict'

import uniq from 'lodash/uniq'

import { EMAIL_TYPE } from '../actions/types'
import { getDataByType } from './'

export function getAllEmails(state) {
  return uniq(getDataByType(EMAIL_TYPE, state))
}
