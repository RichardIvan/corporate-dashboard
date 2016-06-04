/* @flow */
'use strict'


const o = require('../../../../ospec/ospec.js')

const utils = require('../../utils/utils.js')
// const utils = require('module')

o('addition', () => {
  o(1 + 1).equals(2)
})

o('subtraction', () => {
  o(1 - 1).notEquals(2)
})

o('add 3', () => {
  o(0 + 3).equals(3)
})

o('add', () => {
  o(utils.addition(1, 2)).equals(3)
})

o('add2', () => {
  o(utils.addition(2, 2)).notEquals(3)
})

o('add3', () => {
  o(utils.addition(2, 2)).equals(4)
})
