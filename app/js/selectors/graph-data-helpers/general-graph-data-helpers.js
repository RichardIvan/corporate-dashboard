/* @flow */
'use strict'

import moment from 'moment'
import { Map, List } from 'immutable'
import first from 'lodash/first'


import type { IndexedSeq } from 'immutable'


function path(date): Array<string> {
  return date.split('/')
}

export function getDatesInRange(range: Map<string, number>): List<string> {
  const from = moment(range.get('from'), 'x')
  const to = moment(range.get('to'), 'x')

  let result = List.of()
  let currentTime = from

  while (currentTime.isSameOrBefore(to)) {
    result = result.push(currentTime.format('YY/MM/DD'))
    currentTime = currentTime.clone().add(1, 'day')
  }

  return result
}


export function getMonthlyDates(range: Map): List {
  const from = moment(range.get('from'), 'x')
  const to = moment(range.get('to'), 'x')

  let result = List.of()

  let currentMonth = from.startOf('month')

  while (currentMonth.isSameOrBefore(to, 'month')) {
    result = result.push(currentMonth.format('YY/MM/DD'))
    currentMonth = currentMonth.add(1, 'month')
  }

  return result
}

export function getItemsByRange(data: Map, dates: List<string>): List<Map<string, number>> {
  return dates.map((date: string) => data.getIn(path(date)) || new Map())
}


// makes the openIssuesData endpoint be total of original issue IDs
export function transformOpenIssuesTotals(totals) {
  const transformed = totals.map((entry) => {
    // console.log(entry.toJS())
    const issues = entry.get('openIssuesData')

    if (!issues) {
      return entry
    }
    return entry.set('openIssuesData', issues.count())
  })
  return transformed
}


export const sumTotalForEachDataInRange = (data: Map, dates: List<string>): Map<string, number> => {
  const result = getItemsByRange(data, dates).reduce((acc: Map, dailySnapshot: Map) => {
    if (dailySnapshot.isEmpty()) {
      return acc
    }
    const totals: Map<string, number> = dailySnapshot.reduce((accumulator: Map, value: number | Map, key: string) => {
      let val: (number | Map)

      if (key === 'payingCustomersData') {
        val = value || 0
      } else {
        val = value || new Map()
      }

      if (!accumulator.has(key)) {
        return accumulator.set(key, val)
      }

      const currentValue: number | Map = accumulator.get(key)
      // if(Map.isMap(currentValue)) {
      //   console.log(currentValue.toJS());
      // } else {
      //   console.log(currentValue);
      // }

      // return accumulator

      let newValue
      if (key === 'payingCustomersData') {
        newValue = currentValue + val
      } else {
        newValue = currentValue.merge(val)
      }

      return accumulator.set(key, newValue)
    }, acc)
    // if(Map.isMap(totals)) {
    //   console.log(totals.toJS());
    // } else {
    //   console.log(totals);
    // }
    // console.log(totals)
    return totals
  }, new Map())
  return result
}
  // this will be a map of things wilt lists of numbers
  // for each thing, reduce the list to single value


  // getPayingCustomersInRange(data, range, type)
  //   .reduce((acc, value: Map) => acc + value.get('total'), 0)

export function firstMonthTotal(data: Map, range: Map): List<Map<string, number>> {

  if (!data || !range || !Map.isMap(data) || !Map.isMap(range)) {
    throw new Error('invalid arguments')
  }

  const firstMonthRange = range.set(
                            'to',
                            +moment(range.get('from'), 'x').endOf('month').format('x')
                          )


  return List.of(sumTotalForEachDataInRange(data, getDatesInRange(firstMonthRange)))
}

export function lastMonthTotal(data: Map, range: Map): List<Map<string, number>> {
  const lastMonthRange = range.set(
                            'from',
                            +moment(range.get('to'), 'x').startOf('month').format('x')
                          )

  return List.of(sumTotalForEachDataInRange(data, getDatesInRange(lastMonthRange)))
}

export function fullMonthsTotals(data: Map, months: List<string>): List<Map<string, number>> {
  if (!Map.isMap(data) || !List.isList(months)) {
    throw new Error('invalid arguments')
  }

  return months.map((month) => {
    const date = moment(month, 'YY/MM/DD')
    const from: number = +date.clone().startOf('month').format('x')
    const to: number = +date.clone().endOf('month').format('x')
    const range: Map = new Map({
      from,
      to,
    })

    return sumTotalForEachDataInRange(data, getDatesInRange(range))
  })
}

export function getTotalsByRange(data: Map, range: Map, months: List): List<Map<string, number>> {
  const monthsLen: number = months.count()

  let totals: List = List.of()

  if (monthsLen > 2) {
    const fullMonths = months.skip(1).butLast()

    totals = totals.concat(firstMonthTotal(data, range))
              .concat(fullMonthsTotals(data, fullMonths))
              .concat(lastMonthTotal(data, range))
  } else if (monthsLen === 2) {
    totals = totals.concat(firstMonthTotal(data, range))
              .concat(lastMonthTotal(data, range))
  } else if (monthsLen === 1) {
    totals = totals.concat(List.of(sumTotalForEachDataInRange(data, getDatesInRange(range))))
  } else {
    throw new Error('invalid months argument')
  }

  return transformOpenIssuesTotals(totals)
}

export function getHighestDate(data: Map): string {
  let result = List.of()
  let keys = data.entrySeq()
  while (keys && result.count() < 3) {
    const hignest = first(keys.max())
    result = result.push(hignest)
    const next = data.getIn(result.toArray())
    if (Map.isMap(next)) {
      keys = next.entrySeq()
    }
  }
  return result.toArray().join('/')
}

export function getLowestDate(data: Map): string {
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

export function mergeResultsByType(result: Map, types: List<string>): List<Map<string, number>> {
  const dates = result.get('dates')

  return dates.map((date, index) => {
    const extracted = types.reduce((acc, entry) => {
      if (!entry) {
        return acc
      }
      const value = result.getIn(['totals', index, entry])
      if (!value) {
        return acc
      }
      return acc.set(entry, value)
    }, new Map())
    return extracted.set('date', date)
  })
}
