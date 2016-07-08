/* @flow */
'use strict'

import random from 'lodash/random'
import add from 'lodash/add'
import subtract from 'lodash/subtract'

export function addOrSubtract(): number {
  return random(1)
}

export function generateRandomNumberBetweenZeroAndThree(): number {
  return random(3)
}

const willChange = () => random(1)

export function produceNewNumber(previousValue: number): number {
  let result
  if (typeof previousValue !== 'number') {
    throw new Error('number should be passed in')
  }
  if (willChange()) {
    if (addOrSubtract()) {
      result = add(previousValue, generateRandomNumberBetweenZeroAndThree())
    } else {
      result = subtract(previousValue, generateRandomNumberBetweenZeroAndThree())
    }
  } else {
    result = previousValue
  }

  return result < 0 ? 0 : result
}
