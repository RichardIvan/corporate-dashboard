'use strict'

import m from 'mithril'

import TableComponent from '../components/Table'

import { mockedHeaderColumnNames, mockedIssue } from '../../../tests/mocks/data'
import { getVisibleIssues } from '../selectors'

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

    console.log(getVisibleIssues(state))
    // console.log(state.getState().issues)
    return m(TableComponent, {
      ...vdom.attrs,
      columns: mockedHeaderColumnNames,
      issues: getVisibleIssues(state),
    })
  },
}

export default Table
