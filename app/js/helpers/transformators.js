/* @flow */
'use strict'

// TODO write tests

import moment from 'moment'

import first from 'lodash/first'
import last from 'lodash/last'
import slice from 'lodash/slice'
import map from 'lodash/map'
import upper from 'lodash/upperFirst'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../actions'

function transformName(name: string) {
  const nameParts = name.split(' ')
  const firstName: string = upper(first(nameParts))
  const rest = slice(nameParts, 1)

  const shortened: Array<string> = map(rest, (item) => `${upper(first(item))}.`)
  const transformed = `${firstName} ${shortened.join(' ')}`

  return transformed
}

function transformEmail(email: string) {
  const parts = email.split('@')
  const firstPart = `${first(first(parts))}..`

  const secondPart = last(last(parts).split('.'))

  const transformed = `${firstPart}@..${secondPart}`

  return transformed
}

function transformTimestamp(timestamp: number) {
  return moment(timestamp).format('DD/MM/YY')
}

function transformEmployeeName(name: string): string {
  return map(name.split(' '), (part) => `${upper(first(part))}.`).join('')
}

function transformOpenStatus(value): string {
  return (value === 'true' || value === true) ? 'open' : 'closed'
}

function transformLocation(value: string) {
  return `${value.substr(0, 2)}${value.substr(-2, 2)}`.toUpperCase()
}

export function transformItem(type: string, value: number | string): string | number {
  switch (type) {
  case NAME_TYPE:
    return transformName(value)
  case EMAIL_TYPE:
    return transformEmail(value)
  case OPENING_TIMESTAMP_TYPE:
    return transformTimestamp(value)
  case CLOSING_TIMESTAMP_TYPE:
    return value ? transformTimestamp(value) : value
  case EMPLOYEE_TYPE:
    return transformEmployeeName(value)
  case OPEN_STATUS_TYPE:
    return transformOpenStatus(value)
  case LOCATION_TYPE:
    return transformLocation(value)
  default:
    return value
  }
}
