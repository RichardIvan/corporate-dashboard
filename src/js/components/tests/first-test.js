/* @flow */
'use strict'


const o = require('../../../../ospec/ospec.js')

const utils = require('../../utils/utils.js')

o.spec('basic tests', () => {
  o.spec('utils tests', () => {
    o('addition', () => {
      o(utils.addition(2, 2)).equals(4)
    })

    o('addition1', () => {
      o(utils.addition(2, 1)).notEquals(4)
    })

    o('substract equals', () => {
      o(utils.subtraction(2, 2)).equals(0)
    })

    o('substract not equals', () => {
      o(utils.subtraction(
        2, 2)).notEquals(1)('substraction should work')
    })
  })
})
