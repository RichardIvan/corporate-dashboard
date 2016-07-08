/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import {
  addOrSubtract,
  generateRandomNumberBetweenZeroAndThree,
  produceNewNumber,
} from '../../../server/src/helpers/paying-customers-helpers'

describe('Paying Customers Helpers', () => {

  // funciton takes previsou value and returns new value
  // after addition or substraction
  describe('ProduceNewNumber of paying customers', () => {
    // it should return a number that is within the 0 - 50 range
    // up or down
    it('should return a number that is between 0 and 3 from the previous number', () => {
      const previous = 150
      const lowerBand = previous - 4
      const upperBand = previous + 4

      const result = produceNewNumber(previous)
      expect(result).toBeGreaterThan(lowerBand)
      expect(result).toBeLessThan(upperBand)
    })

    it('should not return lower nuber than 0', () => {
      const previous = 0


      let counter = 0
      while( counter <= 1000 ) {
        const result = produceNewNumber(previous)
        expect(result).toBeGreaterThan(-1)
        counter++
      }
    })
    // should return number

    // should be called with number being passed in
    it('should be called with number being passed in', () => {
      const spy = expect.createSpy(produceNewNumber)
      spy(1)
      // fn()
      // spy.andCall(fn)
      expect(spy).toHaveBeenCalledWith(1)
    })

    it('should throw if non-number is called', () => {
      expect(produceNewNumber.bind(null, 1)).toNotThrow()
      expect(produceNewNumber.bind(null, '1')).toThrow()
    })
  })

  // helper that will decide if it will be addition or substraction
  describe('Add or Substract Helper', () => {
    // it should return 0 or 1
    it('should return 0 or 1', () => {
      const result = addOrSubtract()
      expect(result).toBeGreaterThan(-1)
      expect(result).toBeLessThan(2)
    })
  })

  // helper that will decide how much it will be adding
  // between 0 and 50
  describe('Random number between 0 and 3 generator', () => {
    // should return a nuber between 0 and 50
    it('should return a number between 0 and 3', () => {
      const result = generateRandomNumberBetweenZeroAndThree()
      expect(result).toBeGreaterThan(-1)
      expect(result).toBeLessThan(4)
    })
  })
})
