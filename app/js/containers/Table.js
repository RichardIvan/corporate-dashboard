'use strict'

import m from 'mithril'

import TableComponent from '../components/Table'

import { mockedHeaderColumnNames, mockedIssue } from '../../../tests/mocks/data'

// import { mockedIssue } from '../../../../../../../../tests/mocks/data'

const mockedVidibleData = (issue) => {
  let array = new Array(9).fill('')
  array = array.map(() => Object.keys(issue).map((key) => issue[key]))
  return array
}
// import { mockedHeaderColumnNames } from '../../../../../../../tests/mocks/data'

const Table = {
  view(vdom) {
    const state = vdom.attrs.store.getState()
    // console.log(state.getState().issues)
    console.log(state.issues.keys())

    return m(TableComponent, {
      ...vdom.attrs,
      columns: mockedHeaderColumnNames,
      issues: ['state', 'issues'],
    })
  },
}

export default Table
