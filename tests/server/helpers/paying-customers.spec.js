// /* @flow */
// 'use strict'

// import { describe, it } from 'mocha'
// import expect from 'expect'

// import { Map } from 'immutable'
// import moment from 'moment'

// import {
//   generatePayingCustomerData,
// } from '../../../server/src/helpers/paying-customers'

// describe('Paying Customers Generator', () => {

//   // it should be a Map
//   it('should be a map', () => {
//     expect(generatePayingCustomerData()).toBeA(Map)
//   })

//   // should start from 01/01/2014
//   it('should start from 01/01/2014', () => {
//     const result = generatePayingCustomerData()
//     // const keys = result.keySeq()
//     // const sortedKeys = keys.sortBy((key) => parseInt(key, 10))
//     // const sortedDesc = sortedKeys.reverse()
//     const lowestYear = result.keySeq().sortBy(key => parseInt(key, 10)).first()
//     const lowestMonth = result.get(lowestYear).keySeq().sortBy(key => parseInt(key, 10)).first()
//     const lowersDay = result.getIn([lowestYear, lowestMonth]).keySeq().sortBy(key => parseInt(key, 10)).first()

//     const lowestDate = `${[lowestYear, lowestMonth, lowersDay].reverse().join('/')}`
// // 
//     expect(
//       lowestDate
//     ).toBe('01/01/14')
//     // console.log(moment(sortedDesc.first(), 'x').format('DD/MM/YY'))
//   })

//   // shoudl finish today
//   it('should finish today', () => {
//     const result = generatePayingCustomerData()
//     // const keys = result.keySeq()
//     // const sortedKeys = keys.sortBy((key) => parseInt(key, 10))
//     // const sortedDesc = sortedKeys.reverse()

//     const lookupKey = moment().format('YY/MM/DD').split('/')

//     expect(
//       result.getIn(lookupKey)
//     ).toBeA('number')
//     // console.log(moment(sortedDesc.first(), 'x').format('DD/MM/YY'))
//   })

//   // should generate a map of timestamps and values
// })
