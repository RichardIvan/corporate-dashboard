/* @flow */
'use strict'

import moment from 'moment'
import { Map, List } from 'immutable'
import sum from 'lodash/sum'

import {
  getPayingCustomersInRange,
} from '../selectors'





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

  const total = getPayingCustomersInRange(data, range).get('totals')
                  .reduce((acc, value) => acc + value, 0)
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

  const total = getPayingCustomersInRange(data, range).get('totals')
                  .reduce((acc, value) => acc + value, 0)
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
  const total = getPayingCustomersInRange(data, range).get('totals')
                  .reduce((acc, value) => acc + value, 0)
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

  const dates = revertStrings(months)
  // console.log(dates.toJS())
  // console.log(totals.toJS())

  return Map({
    dates,
    totals,
  })
  // console.log(fullMonths.count())

  // it should call only get first and get last
  // if the above list is of length 2

  // it should get taotal by range
  // if the above list of of length 1

  // getTotalsByMonth
  // getTotalForFirstMonth
  // getTotalForLastMonth

  return Map()
}
