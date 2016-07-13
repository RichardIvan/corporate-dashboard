/* @flow */
'use strict'

import moment from 'moment'
import { List, Map } from 'immutable'

import {
  getPayingCustomersInRange,
} from './paying-customers'

import first from 'lodash/first'




export function getMonthDateStringsInRange(f: number, t: number): List {
  const from = moment(f, 'x')
  const to = moment(t, 'x')

  if (!from.isValid() || !to.isValid()) {
    throw new Error('invalid dates')
  }

  let currentMonth = from.startOf('month')
  while (currentMonth.isSameOrBefore(to, 'month')) {
    result = result.push(currentMonth.format('YY/MM/DD'))
    currentMonth = currentMonth.add(1, 'month')
  }

  return result
}



// TODO move to helpers
export const sumTotalForRange = (data: Map, range: Map, type: string): number =>
  getPayingCustomersInRange(data, range, type)
    .reduce((acc, value: Map) => acc + value.get('total'), 0)


export function singleMonthSum(data: Map, f: number, t: number, type: string): number {
  const from = moment(f, 'x')
  const to = moment(t, 'x')

  if ((!data || !Map.isMap(data)) || (!from || !from.isValid()) || (!to || !to.isValid())) {
    throw new Error('missing or incorrect arguments')
  }

  const range = new Map({
    from: +from.clone().format('x'),
    to: +to.clone().format('x'),
  })

  const total = sumTotalForRange(data, range, type)

  return total
}


export function firstMonthSum(data: Map, f: number, type: string): number {
  if (arguments.length !== 3) {
    throw new Error('missing or incorrect arguments')
  }

  const from = moment(f, 'x')

  if (
      (!data || !Map.isMap(data)) ||
      (!from || !from.isValid()) ||
      (typeof type !== 'string')
    ) {
    throw new Error('missing or incorrect arguments')
  }

  const range = new Map({
    from: +from.clone().format('x'),
    to: +from.clone().endOf('month').format('x'),
  })

  const total = sumTotalForRange(data, range, type)

  return total
}


export function lastMonthSum(data: Map, t: number, type: string): number {
  const to = moment(t, 'x')

  if ((!data || !Map.isMap(data)) || (!to || !to.isValid())) {
    throw new Error('missing or incorrect arguments')
  }

  const range = new Map({
    from: +to.clone().startOf('month').format('x'),
    to: +to.clone().format('x'),
  })

  // console.log(sum(getPayingCustomersInRange(data, range).get('totals').toJS()))

  // sum all values in the List
  const total = sumTotalForRange(data, range, type)

  return total
}


export function fullMonthsTotals(data: Map, arr: List, type: string): List {
  const totals = arr.map((date) => {
    const from = +moment(date, 'YY/MM/DD').format('x')
    const to = +moment(date, 'YY/MM/DD').endOf('month').format('x')

    return singleMonthSum(data, from, to, type)
  })

  return totals
}



// TODO test
// TODO move to helpers
export function revertStrings(months: List<string>): List<string> {
  return months.map((dateString) => {
    let arr = dateString.split('/')
    arr = arr.reverse()
    return arr.join('/')
  })
}


export function getLowestDates(data: Map): string {
  let result = List.of()
  let keys = data.entrySeq()
  while (keys && result.count() < 3) {
    const lowest = first(keys.min())
    result = result.push(lowest)
    const next = data.getIn(result.toArray())
    if (Map.isMap(next)) {
      keys = next.entrySeq()
    }
  }
  return result.toArray().join('/')
}


export function getHighestDates(data: Map): string {
  let result = List.of()
  let keys = data.entrySeq()
  while (keys && result.count() < 3) {
    const higest = first(keys.max())
    result = result.push(higest)
    const next = data.getIn(result.toArray())
    if (Map.isMap(next)) {
      keys = next.entrySeq()
    }
  }
  return result.toArray().join('/')
}


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


export function constructPath(dateString: string, type: string): Array<string> {
  const path = dateString.split('/')
  path.push(type)
  return path
}


export function getTotalsByDatesInRange(data: Map, array: List, type: string): List {
  if (arguments.length !== 3) {
    throw new Error('missing arguments')
  }
  if (!Map.isMap(data)) {
    throw new Error('invalid data type')
  }
  if (!List.isList(array)) {
    throw new Error('invalid list of dates type')
  }
  if (typeof type !== 'string') {
    throw new Error('invalid endpoint type')
  }

  let result = List.of()

  // TODO test that it should not return undefined, but rather zero if so
  result = array.map((dateString: string) => {
    const d = data.getIn(constructPath(dateString, type))
    return d || 0
  })

  return result
}

// takes List and transforms 'YY/MM/DD' to 'DD/MM/YY'
export function reverseDateStrings(dates: List): List {
  return dates.map(
          (date: string) => moment(date, 'YY/MM/DD').format('DD/MM/YY')
        )
}
