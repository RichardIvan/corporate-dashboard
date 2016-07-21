/* @flow */
'use strict'

import moment from 'moment'
import { List } from 'immutable'

export function formatDate (date: string): number {
  return +moment(date, 'YY/MM/DD').format('x')
}

export function reverseDateStrings (months: List<string>): List<string> {
  return months.map((date) => moment(date, 'YY/MM/DD').format('DD/MM/YY'))
}
