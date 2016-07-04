/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import { List, fromJS } from 'immutable'

import { EMPLOYEE_TYPE } from '../../../../app/js/actions/types'
import { getAllEmployees } from '../../../../app/js/selectors'

describe('Employees Selector', () => {
  let state

  beforeEach(() => {
    state = {
      partials: {
        [EMPLOYEE_TYPE]: List.of(
          List.of(1, 'him'),
          List.of(1, 'her'),
          List.of(1, 'him'),
          List.of(1, 'her')
        ),
      },
    }
  })

  it('should retrieve an array', () => {

    const out = getAllEmployees(state)

    expect(List.isList(out)).toBe(true)
  })

  it('should include only unique names', () => {

    const out = getAllEmployees(state)

    expect(out).toEqual(fromJS(['him', 'her']))
  })
})
