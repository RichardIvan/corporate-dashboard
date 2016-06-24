/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { generateShortVersions } from '../../../../../app/js/helpers'

import { data } from './data'

describe('Generate Short Versions', () => {
  it('should return an Object withe the same amount of keys', () => {

      const keys = Object.keys(data)
      const keysAfterTranformation = Object.keys(generateShortVersions(data))

      expect(keys).toEqual(keysAfterTranformation)
  })
})
