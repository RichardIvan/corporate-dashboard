/* @flow */
'use strict'

import moment from 'moment'
import { Map } from 'immutable'

import random from 'lodash/random'

import { produceNewNumber } from './paying-customers-helpers'

export function generateSingleCustomerData() {
  const result = Map()
  const add = random(1)
  const number = random(1)
  let total = 0
  if (add) {
    total = total + number
  } else {
    total = total - number
  }
  const currentPath = moment().format('YY/MM/DD').split('/')

  return result.setIn(currentPath, total)
}

export function generatePayingCustomerData() {
  let result = Map()

  const startDate = moment('01/01/14', 'DD/MM/YY')
  const now = moment()

  let current = startDate
  let currentValue: number = 0
  while (current.isBefore(now)) {
    // const currentTimestamp = current.format('x')

    const currentPath = current.format('YY/MM/DD').split('/')
    const newValue = produceNewNumber(currentValue)

    // const newItem = Map().setIn(currentPath, newValue)
    // result = result.mergeDeep(newItem)
    // console.log(newItem)
    result = result.setIn(currentPath, newValue)
    // result = result.set(currentTimestamp, newValue)

    current = current.startOf('day').add(1, 'day')
    currentValue = newValue
    // currentValue = result.get(currentTimestamp)
  }

  // console.log('end')
  // console.log(result)
  return result
}
