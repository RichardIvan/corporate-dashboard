// /* @flow */
// 'use strict'
//
// import { describe, it, beforeEach } from 'mocha'
// import expect, { spyOn } from 'expect'
// import moment from 'moment'
//
// import { Map, List } from 'immutable'
//
// import sum from 'lodash/sum'
// import random from 'lodash/random'
//
//
// import {
//   getPayingCustomersDataByMonth,
//   getMonthDateStringsInRange,
//   firstMonthSum,
//   lastMonthSum,
//   singleMonthSum,
//   fullMonthsTotals,
// } from '../../../../app/js/selectors/paying-customers'
//
// // import {
// //   getPayingCustomersInRange,
// // } from '../../../../app/js/selectors/'
//
// // import {
// //   getDatesInRange,
// //   getTotalsByDatesInRange,
// //   reverseDateStrings,
// // } from '../../../../app/js/selectors/paying-customers-helpers'
//
// import {
//   generatePayingCustomerData,
// } from '../../../../server/src/helpers'
//
// const data = generatePayingCustomerData()
//
// describe('Paying Customers Helpers', () => {
//   describe('#getPayingCustomersDataByMonth()', () => {
//     let range
//
//     beforeEach(() => {
//       range = new Map({
//         range: 'set',
//         from: +moment('01/01/14', 'DD/MM/YY')
//                 .startOf('day')
//                 .format('x'),
//         to: +moment()
//               .startOf('day')
//               .format('x'),
//       })
//     })
//
//     // it should have 2 arguments passed in
//     it('should have 3 arguments passed in', () => {
//       const call = {
//         getPayingCustomersDataByMonth,
//       }
//       const spy = spyOn(call, 'getPayingCustomersDataByMonth')
//       call.getPayingCustomersDataByMonth(data, range)
//       // spy(data, range)
//
//       expect(spy.calls[0].arguments.length).toBe(3)
//
//       expect(
//         getPayingCustomersDataByMonth.bind(null)
//       ).toThrow('missing arguments')
//
//       expect(
//         getPayingCustomersDataByMonth.bind(null, data)
//       ).toThrow('missing arguments')
//
//       expect(
//         getPayingCustomersDataByMonth.bind(null, data, range)
//       ).toThrow('missing arguments')
//
//       expect(
//         getPayingCustomersDataByMonth.bind(null, data, range, '1')
//       ).notToThrow()
//     })
//
//     // it should have data passed in
//     it('should have data passed in', () => {
//       const call = {
//         getPayingCustomersDataByMonth,
//       }
//       const spy = spyOn(call, 'getPayingCustomersDataByMonth')
//       call.getPayingCustomersDataByMonth(data, range)
//
//       expect(spy.calls[0].arguments[0]).toBe(data)
//     })
//
//     // it should have range passed in
//     it('should have range passed in', () => {
//       const call = {
//         getPayingCustomersDataByMonth,
//       }
//       const spy = spyOn(call, 'getPayingCustomersDataByMonth')
//       call.getPayingCustomersDataByMonth(data, range)
//
//       spy(data, range)
//
//       expect(spy.calls[0].arguments[1]).toBe(range)
//     })
//
//     // it should return Map
//     it('should return a List', () => {
//       expect(getPayingCustomersDataByMonth(data, range)).toBeA(List)
//     })
//
//     it('should throw when no data is provided', () => {
//       expect(getPayingCustomersDataByMonth.bind(null)).toThrow('Missing arguments')
//     })
//
//     it('should throw when no range is provided', () => {
//       expect(getPayingCustomersDataByMonth.bind(null, 'data')).toThrow('Missing arguments')
//     })
//
//     it('should throw if one of the arguments is not a Map', () => {
//       expect(
//         getPayingCustomersDataByMonth.bind(null, 'data', new Map())
//       ).toThrow('Wrong type of argument(s)')
//       expect(
//         getPayingCustomersDataByMonth.bind(null, new Map(), 'range')
//       ).toThrow('Wrong type of argument(s)')
//       expect(
//         getPayingCustomersDataByMonth.bind(null, data, range)
//       ).toNotThrow('Wrong type of argument(s)')
//     })
//
//     // Map should container entry 'dates'
//     // with corresponding List of dates
//     // these items should ve dates in format 'DD/MM/YY'
//     it('should contain entry "dates"', () => {
//       const a = moment(range.get('from', 'x'))
//       const b = moment(range.get('to'), 'x')
//       const numberOfDays = Math.abs(a.diff(b, 'months')) + 1
//       // expect(getPayingCustomersDataByMonth(data, range).has('dates')).toBe(true)
//       expect(
//         getPayingCustomersDataByMonth(data, range).count()
//       ).toBe(numberOfDays)
//     })
//
//     // Map should contain entry 'totals'
//     // with corresponding list of values
//     // looked up by corresponding date from array at the
//     // same position
//     it('should contain "totals"', () => {
//       // expect(getPayingCustomersDataByMonth(data, range).has('totals')).toBe(true)
//       expect(
//         getPayingCustomersDataByMonth(data, range)
//           .get(1)
//           .has('date')
//       ).toBe(
//         true
//       )
//       expect(
//         getPayingCustomersDataByMonth(data, range)
//           .get(1)
//           .has('total')
//       ).toBe(
//         true
//       )
//     })
//   })
// })
//
// describe('Get Paying Customers Data By Month Helpers', () => {
//   let range
//   let from
//   let to
//
//   beforeEach(() => {
//     range = new Map({
//       range: 'set',
//       from: +moment('01/01/14', 'DD/MM/YY')
//               .startOf('day')
//               .format('x'),
//       to: +moment()
//             .startOf('day')
//             .format('x'),
//     })
//     from = range.get('from')
//     to = range.get('to')
//   })
//
//   describe('#getMonthDateStringsInRange()', () => {
//     // it should accept from and to dates
//     it('should should accept from and to dates', () => {
//       const call = {
//         getMonthDateStringsInRange,
//       }
//       const spy = spyOn(call, 'getMonthDateStringsInRange')
//
//       call.getMonthDateStringsInRange(from, to)
//
//       expect(spy.calls[0].arguments.length).toBe(2)
//     })
//
//     // it should throw if it's being passed invalid moment value
//     it('should throw if its being passed invalid moment values', () => {
//       // const spy = spyOn(call, 'getDatesInRange')
//       // call.getDatesInRange(from, to)
//
//       expect(getMonthDateStringsInRange.bind(null, from, to)).toNotThrow()
//       expect(getMonthDateStringsInRange.bind(null, 'from', to)).toThrow('invalid dates')
//     })
//
//     // it should return a List
//     it('should return a List', () => {
//       expect(getMonthDateStringsInRange(from, to)).toBeA(List)
//     })
//
//     // entry in list should be a datesString 'YY/MM/01'
//     it('should have entries with a date formated as "YY/MM/01"', () => {
//       expect(
//         getMonthDateStringsInRange(from, to).last()
//       ).toBe(`${moment().format('YY/MM')}/01`)
//     })
//
//     // it should have number of entries according to
//     // number of months in range
//     it('should have number of entries according to number of months in range', () => {
//       from = +moment('01/01/16', 'DD/MM/YY').format('x')
//       to = +moment('01/03/16', 'DD/MM/YY').format('x')
//
//       expect(getMonthDateStringsInRange(from, to).count())
//         .toBe(3)
//
//       // getPayingCustomersDataByMonth(data, range)
//     })
//   })
//
//   describe('#firstMonthSum()', () => {
//     // should accept 2 arguments
//
//     // should accept data
//
//     // should accept moment parsabel date
//     it('should throw is missing or incorrect arguments', () => {
//       const call = {
//         firstMonthSum,
//       }
//
//       const spy = spyOn(call, 'firstMonthSum')
//       call.firstMonthSum(data, range, 'payingCustomersData')
//
//       expect(spy.calls[0].arguments.length).toBe(3)
//       expect(firstMonthSum.bind(null)).toThrow('missing or incorrect arguments')
//       expect(
//         firstMonthSum.bind(
//           null,
//           'data',
//           moment(from).format('YY/MM/DD')
//         )
//       ).toThrow('missing or incorrect arguments')
//       expect(
//         firstMonthSum.bind(
//           null,
//           data,
//           'from'
//         )
//       ).toThrow('missing or incorrect arguments')
//       expect(
//         firstMonthSum.bind(
//           null,
//           data,
//           moment(from).format('YY/MM/DD'),
//           1
//         )
//       ).toThrow('missing or incorrect arguments')
//       expect(
//         firstMonthSum.bind(
//           null,
//           data,
//           moment(from).format('YY/MM/DD'),
//           'payingCustomersData'
//         )
//       ).toNotThrow()
//     })
//
//     // shouldl return number
//     it('should return number', () => {
//       expect(
//         firstMonthSum(data, moment(from).add(3, 'days').format('YY/MM/DD'))
//       ).toBeA('number')
//     })
//
//     // should return sum of numbers in range
//     it('should return sum of numbers in range', () => {
//       const endOfMonth = moment().endOf('month')
//       const endOfMonthMinus2Days = endOfMonth.clone().subtract(2, 'days')
//       let curr = endOfMonthMinus2Days.clone()
//
//       // console.log(endOfMonthMinus2Days.format('YY/MM/DD'))
//       // console.log(endOfMonth.format('YY/MM/DD'))
//
//       // d = data
//       let d = new Map()
//       const values = []
//
//       while (curr.isSameOrBefore(endOfMonth)) {
//         const number = random(3)
//         const path = curr.format('YY/MM/DD').split('/')
//         d = d.setIn(path, number)
//         values.push(number)
//         curr = curr.clone().add(1, 'day')
//       }
//
//       expect(
//         firstMonthSum(d, endOfMonthMinus2Days.format('x'))
//       ).toBe(sum(values))
//     })
//   })
//
//   describe('#lastMonthSum()', () => {
//     // should accept moment parsabel date
//     it('should throw is missing or incorrect arguments', () => {
//       // const call = {
//       //   lastMonthSum,
//       // }
//       //
//       // const spy = spyOn(call, 'lastMonthSum')
//
//       expect(lastMonthSum.bind(null)).toThrow('missing or incorrect arguments')
//       expect(
//         lastMonthSum.bind(null, 'data', moment(to).format('YY/MM/DD'))
//       ).toThrow('missing or incorrect arguments')
//       expect(lastMonthSum.bind(null, data, 'to')).toThrow('missing or incorrect arguments')
//       expect(lastMonthSum.bind(null, data, moment(to).format('YY/MM/DD'))).toNotThrow()
//     })
//
//     // shouldl return number
//     it('should return number', () => {
//       expect(
//         lastMonthSum(data, moment(to).subtract(3, 'days').format('YY/MM/DD'))
//       ).toBeA('number')
//     })
//
//     // should return sum of numbers in range
//     it('should return sum of numbers in range', () => {
//       const startOfMonth = moment().startOf('month')
//       const threeDaysLater = startOfMonth.clone().add(2, 'days')
//       let curr = startOfMonth.clone()
//
//       // console.log(startOfMonth.format('YY/MM/DD'))
//       // console.log(threeDaysLater.format('YY/MM/DD'))
//
//       let d = new Map()
//       const values = []
//
//       while (curr.isSameOrBefore(threeDaysLater)) {
//         const number = random(3)
//         const path = curr.format('YY/MM/DD').split('/')
//         d = d.setIn(path, number)
//         values.push(number)
//         curr = curr.clone().add(1, 'day')
//       }
//
//       expect(
//         lastMonthSum(d, threeDaysLater.clone().format('x'))
//       ).toBe(sum(values))
//     })
//   })
//
//   describe('#singleMonthSum()', () => {
//     let d = new Map()
//     let f
//     let t
//     let values = List.of()
//
//     beforeEach(() => {
//       f = moment().startOf('month').add(3, 'days')
//       t = f.clone().add(2, 'days')
//       let curr = f.clone()
//
//       while (curr.isSameOrBefore(t)) {
//         const number = random(50)
//         const path = curr.clone().format('YY/MM/DD').split('/')
//         d = d.setIn(path, number)
//         values = values.push(number)
//         curr = curr.clone().add(1, 'day')
//       }
//     })
//
//     // it returns a sum of values
//     it('should return a sum of values', () => {
//       expect(
//         singleMonthSum(d, +f.clone().format('x'), +t.clone().format('x'))
//       ).toBe(sum(values.toJS()))
//     })
//
//     // should throw if 2 remining values are not valid moment thingy
//     it('should accept valid arguments or throw', () => {
//       expect(
//         singleMonthSum.bind(null)
//       ).toThrow('missing or incorrect arguments')
//       expect(
//         singleMonthSum.bind(
//           null,
//           'data',
//           from.clone().format('x'),
//           to.clone().format('x')
//         )
//       ).toThrow('missing or incorrect arguments')
//       expect(
//         singleMonthSum.bind(null, data, 'from', to.clone().format('x'))
//       ).toThrow('missing or incorrect arguments')
//       expect(
//         singleMonthSum.bind(null, data, from.clone().format('x'), 'to')
//       ).toThrow('missing or incorrect arguments')
//       expect(
//         singleMonthSum.bind(
//           null,
//           data,
//           from.clone().format('YY/MM/DD'),
//           to.clone().format('YY/MM/DD')
//         )
//       ).toNotThrow()
//     })
//
//     // it returns a number
//     it('should return a number', () => {
//       expect(
//         singleMonthSum(data, +from.clone().format('x'), +to.clone().format('x'))
//       ).toBeA('number')
//     })
//   })
//
//   describe('#fullMonthsTotals()', () => {
//     let d = new Map()
//     let f
//     let t
//     const values = []
//
//     beforeEach(() => {
//       f = moment().startOf('year').add(3, 'days')
//       t = moment()
//       let curr = f.clone()
//
//       // (from.format('YY/MM/DD'))
//       // console.log(t.format('YY/MM/DD'))
//
//       while (curr.isSameOrBefore(t)) {
//         const number = random(50)
//         const path = curr.format('YY/MM/DD').split('/')
//         d = d.setIn(path, number)
//         values.push(number)
//         curr = curr.clone().add(1, 'day')
//       }
//     })
//     // returns List
//     it('should return List', () => {
//       expect(
//         fullMonthsTotals(d, List.of('16/05/01', '16/06/01', '16/07/01'))
//       ).toBeA(List)
//     })
//
//     // should trow if no data provided
//   })
// })
