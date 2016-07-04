/* @flow */
'use strict'

// import uniq from 'lodash/uniq'
// import map from 'lodash/map'

import { EMAIL_TYPE } from '../actions/types'
import { getDataByType } from './'

import { Map } from 'immutable'

export function getAllEmails(state) {
  const emailsMap = getDataByType(EMAIL_TYPE, state).reduce((acc, emailSet) => {
    return acc.set(emailSet.get(1), undefined)
  }, Map())
  const emails = emailsMap.keySeq().toList()
  return emails
}
