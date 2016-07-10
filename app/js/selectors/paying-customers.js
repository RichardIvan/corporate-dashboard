/* @flow */
'use strict'

import { Map, List } from 'immutable'

import {
  getDatesInRange,
  getTotalsByDatesInRange,
  reverseDateStrings,
} from './paying-customers-helpers'

import moment from 'moment'
import first from 'lodash/first'

// TODO test
export function getPayingCustomersData(state): Map {
  return state.graphData.get('data')
}

export function getLowestDates(data) {
  let result = List.of()
  let keys = data.entrySeq()
  while (keys && result.count() < 3) {
    const lowest = first(keys.min())
    result = result.push(lowest)
    const next = data.getIn(result.toArray())
    if(Map.isMap(next)) {
      keys = next.entrySeq()
    }
  }
  return result.toArray().join('/')
}

export function getHighestDates(data: Map) {
  let result = List.of()
  let keys = data.entrySeq()
  while (keys && result.count() < 3) {
    const higest = first(keys.max())
    result = result.push(higest)
    const next = data.getIn(result.toArray())
    if(Map.isMap(next)) {
      keys = next.entrySeq()
    }
  }
  return result.toArray().join('/')
}

export function getPayingCustomersInRange(data: Map, range:Map): List {
  if (!data || !range) {
    throw new Error('Missing arguments')
  }
  if (!Map.isMap(data) || !Map.isMap(range)) {
    throw new Error('Wrong type of argument(s)')
  }

  const rangeType = range.get('range')
  if (rangeType === 'all') {
    const rng = Map({
      from: +moment(getLowestDates(data), 'YY/MM/DD').format('x'),
      to: +moment(getHighestDates(data), 'YY/MM/DD').format('x')
    })

    return getPayingCustomersDataByMonth(data, rng)
  }

  const from = range.get('from')
  const to = range.get('to')

  let dates = getDatesInRange(from, to)
  const totals = getTotalsByDatesInRange(data, dates)
  dates = reverseDateStrings(dates)

  const result = dates.map((date, index) => Map({
    date,
    total: totals.get(index),
  }))

  return result
}

export const sumTotalForRange = (data: Map, range: Map): number => getPayingCustomersInRange(data, range)
                .reduce((acc, value: Map) => acc + value.get('total'), 0)



export function getMonthDateStringsInRange(f, t): List {
  const from = moment(f, 'x')
  const to = moment(t, 'x')

  if (!from.isValid() || !to.isValid()) {
    throw new Error('invalid dates')
  }

  let result = List.of()

  let currentMonth = from.startOf('month')
  while (currentMonth.isSameOrBefore(to, 'month')) {
    result = result.push(currentMonth.format('YY/MM/DD'))
    currentMonth = currentMonth.add(1, 'month')
  }

  // console.log(result)
  return result
}





export function singleMonthSum(data: Map, f: number, t: number): number {
  const from = moment(f, 'x')
  const to = moment(t, 'x')

  if ((!data || !Map.isMap(data)) || (!from || !from.isValid()) || (!to || !to.isValid())) {
    throw new Error('missing or incorrect arguments')
  }

  const range = Map({
    from: +from.clone().format('x'),
    to: +to.clone().format('x'),
  })

  const total = sumTotalForRange(data, range)

  return total
}





export function firstMonthSum(data, f: number) {
  const from = moment(f, 'x')

  if ((!data || !Map.isMap(data)) || (!from || !from.isValid())) {
    throw new Error('missing or incorrect arguments')
  }

  const range = Map({
    from: +from.clone().format('x'),
    to: +from.clone().endOf('month').format('x'),
  })

  const total = sumTotalForRange(data, range)

  return total
}





export function lastMonthSum(data, t: number) {
  const to = moment(t, 'x')

  if ((!data || !Map.isMap(data)) || (!to || !to.isValid())) {
    throw new Error('missing or incorrect arguments')
  }

  const range = Map({
    from: +to.clone().startOf('month').format('x'),
    to: +to.clone().format('x'),
  })

  // console.log(sum(getPayingCustomersInRange(data, range).get('totals').toJS()))

  // sum all values in the List
  const total = sumTotalForRange(data, range)

  return total
}





export function fullMonthsTotals(data: Map, arr: List): List {
  const totals = arr.map((date) => {
    const from = +moment(date, 'YY/MM/DD').format('x')
    const to = +moment(date, 'YY/MM/DD').endOf('month').format('x')

    return singleMonthSum(data, from, to)
  })

  return totals
}

// TODO test
export function revertStrings(months): List<string> {
  return months.map((dateString) => {
    let arr = dateString.split('/')
    arr = arr.reverse()
    return arr.join('/')
  })
}





export function getPayingCustomersDataByMonth(data, range) {
  if (!data || !range) {
    throw new Error('Missing arguments')
  }
  if (!Map.isMap(data) || !Map.isMap(range)) {
    throw new Error('Wrong type of argument(s)')
  }

  const from: number = range.get('from')
  const to: number = range.get('to')
  // getMonthDateStringsInRange
  const months = getMonthDateStringsInRange(from, to)
  // console.log(months.toJS())
  const numberOfMonths = months.count()

  let totals = List.of()

  if (numberOfMonths > 2) {
    const fullMonths = months.skip(1).butLast()
    totals = totals.concat(
                            firstMonthSum(data, from),
                            fullMonthsTotals(data, fullMonths),
                            lastMonthSum(data, to),
                          )
  } else if (numberOfMonths === 2) {
    // sum of of getPayingCustomersInRange().get('totals')
    // let end = from.endOf('month')
    // sum(getPayingCustomersInRange(from, end).get('totals'))
    // sum of of getPayingCustomersInRange().get('totals')
    // let beginning = to.startOf('month')
    totals = List.of(firstMonthSum(data, from), lastMonthSum(data, to))
  } else if (numberOfMonths === 1) {
    totals = List.of(
              singleMonthSum(
                data,
                from,
                to,
              )
            )
    // sum(getPayingCustomersInRange(from, to).get('totals'))
  }

  const dates = reverseDateStrings(months)
  // const dates = revertStrings(months)
  // console.log(dates.toJS())
  // console.log(totals.toJS())

  const listWithData = dates.map((date, index) => Map({
    date,
    total: totals.get(index),
  }))

  // console.log(listWithData)

  return listWithData
}
