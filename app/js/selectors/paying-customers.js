/* @flow */
'use strict'

import moment from 'moment'

import { Map, List } from 'immutable'

import {
  getDatesInRange,
  getTotalsByDatesInRange,
  reverseDateStrings,
  getLowestDates,
  getHighestDates,
  getMonthDateStringsInRange,
  firstMonthSum,
  fullMonthsTotals,
  lastMonthSum,
  singleMonthSum,
} from './paying-customers-helpers'

export function getPayingCustomersDataByMonth(...args: Array<Map>): List<Map> {
  if (args.length !== 2) {
    throw new Error('missing arguments')
  }

  const [data, range] = args

  if (!data || !range) {
    throw new Error('Missing arguments')
  }
  if (!Map.isMap(data) || !Map.isMap(range)) {
    throw new Error('Wrong type of argument(s)')
  }

  const from: number = range.get('from')
  const to: number = range.get('to')

  // getMonthDateStringsInRange
  const months: List<string> = getMonthDateStringsInRange(from, to)
  // console.log(months.toJS())
  const numberOfMonths: number = months.count()

  let totals: List<number> = List.of()

  if (numberOfMonths > 2) {
    const fullMonths: List<string> = months.skip(1).butLast()
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

  const dates: List<string> = reverseDateStrings(months)
  // const dates = revertStrings(months)
  // console.log(dates.toJS())
  // console.log(totals.toJS())

  const listWithData = dates.map((date: string, index: number): Map => new Map({
    date,
    total: totals.get(index),
  }))

  // console.log(listWithData)

  return listWithData
}


// keep
export function getPayingCustomersInRange(...args: Array<Map>): List {
  if (args.length !== 3) {
    throw new Error('Missing arguments')
  }

  const [data, range] = args

  if (!data || !range) {
    throw new Error('Missing arguments')
  }
  if (!Map.isMap(data) || !Map.isMap(range)) {
    throw new Error('Wrong type of argument(s)')
  }

  const rangeType = range.get('range')
  if (rangeType === 'all') {
    const rng = new Map({
      from: +moment(getLowestDates(data), 'YY/MM/DD').format('x'),
      to: +moment(getHighestDates(data), 'YY/MM/DD').format('x'),
    })

    return getPayingCustomersDataByMonth(data, rng)
  }

  const from: number = range.get('from')
  const to: number = range.get('to')

  let dates = getDatesInRange(from, to)
  const totals = getTotalsByDatesInRange(data, dates)
  dates = reverseDateStrings(dates)

  const result = dates.map((date, index) => new Map({
    date,
    total: totals.get(index),
  }))

  return result
}
