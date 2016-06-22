'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import m from 'mithril'
import mq from 'mithril-query'

// import CellContainer from '../../../../app/js/containers/Cell'
import CellComponent from '../../../../app/js/components/Cell'

describe('Cell componennt', () => {
  it('should diplay text within p tag', () => {

    const Cell = mq(
      m(CellComponent, {
        cellData: {
          value: 'Richard',
          type: 'name',
        },
      })
    )

    expect(Cell.has('p')).toBe(true)
    expect(Cell.contains('Richard')).toBe(true)
  })
})
