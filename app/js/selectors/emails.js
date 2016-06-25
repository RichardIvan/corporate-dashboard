/* @flow */
'use strict'

import uniq from 'lodash/uniq'
import map from 'lodash/map'

import { EMAIL_TYPE } from '../actions/types'
import { getDataByType } from './'

export function getAllEmails(state) {
  return uniq(
    map(getDataByType(EMAIL_TYPE, state), (emailPair) => emailPair[1])
  )
}
