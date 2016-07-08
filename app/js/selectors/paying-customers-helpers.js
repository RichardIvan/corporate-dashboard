/* @flow */
'use strict'

import moment from 'moment'
import { List, Map } from 'immutable'

export function getDatesInRange(f: number, t: number): List {
  const from = moment(f, 'x')
  const to = moment(t, 'x')

  if (!from.isValid() || !to.isValid()) {
    throw new Error('invalid dates')
  }

  let result = List.of()
  let currentTime = from
  while (currentTime.isSameOrBefore(to)) {
    result = result.push(currentTime.format('YY/MM/DD'))
    currentTime = currentTime.add(1, 'day')
  }

  return result
}

export function getTotalsByDatesInRange(data: Map, array: List): List {
  let result = List.of()

  // TODO test that it should not return undefined, but rather zero if so
  result = array.map((dateString: string) => data.getIn(dateString.split('/')) || 0)

  return result
}

// takes List and transforms 'YY/MM/DD' to 'DD/MM/YY'
export function reverseDateStrings(dates: List): List {
  return dates.map(
          (date: string) => moment(date, 'YY/MM/DD').format('DD/MM/YY')
        )
}
