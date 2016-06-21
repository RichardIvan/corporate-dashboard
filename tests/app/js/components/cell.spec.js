'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import m from 'mithril'
import mq from 'mithril-query'

// import CellContainer from '../../../../app/js/containers/Cell'
import CellComponent from '../../../../app/js/components/Cell'

describe('Cell componennt', function () {
  it('should diplay text within p tag', () => {

    const Cell = mq(
      m(CellComponent, {
        text: 'Richard'
      })
    )

    expect(Cell.has('p')).toBe(true)
    expect(Cell.contains('Ricahrd')).toBe(true)

  })
})
