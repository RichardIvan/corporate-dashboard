'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { Map } from 'immutable'

import {
  getIssues,
} from '../../../../app/js/selectors'

describe('Issue Selector', () => {
  describe('#getIssues()', () => {
    it('should get array with 10 items', () => {
      const state = {
        issues: new Map({
          one: new Map({
            one: 'two',
          }),
          two: new Map({
            one: 'two',
          }),
          three: new Map({
            one: 'two',
          }),
          four: new Map({
            one: 'two',
          }),
          five: new Map({
            one: 'two',
          }),
          six: new Map({
            one: 'two',
          }),
          seven: new Map({
            one: 'two',
          }),
          eight: new Map({
            one: 'two',
          }),
          nine: new Map({
            one: 'two',
          }),
          ten: new Map({
            one: 'two',
          }),
        }
      ),
      }

      expect(getIssues(state).count()).toBe(10)
    })
  })
})
