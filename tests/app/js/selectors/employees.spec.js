/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { List } from 'immutable'

import { EMPLOYEE_TYPE } from '../../../../app/js/actions/types'
import { getAllEmployees } from '../../../../app/js/selectors'

describe('Employees Selector', () => {
  let state

  beforeEach(() => {
    state = {
      partials: {
        [EMPLOYEE_TYPE]: List.of('him', 'her', 'him', 'her'),
      },
    }
  })

  it('should retrieve an array', () => {

    const out = getAllEmployees(state)

    expect(Array.isArray(out)).toBe(true)
  })

  it('should include only unique names', () => {

    const out = getAllEmployees(state)

    expect(out).toEqual(['him', 'her'])
  })
})
