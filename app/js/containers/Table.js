'use strict'

import m from 'mithril'

import TableComponent from '../components/Table'

import { getHeaderColumnNames, mockedIssue } from '../../../tests/mocks/data'
import { getIssues, getSingleDataByFilter } from '../selectors'

import { getAllFilteredData, allWithOffset } from '../selectors/filter-folder'

// console.log(getSingleDataByFilter)

// import { mockedIssue } from '../../../../../../../../tests/mocks/data'

// const mockedVidibleData = (issue) => {
//   let array = new Array(9).fill('')
//   array = array.map(() => Object.keys(issue).map((key) => issue[key]))
//   return array
// }
// import { mockedHeaderColumnNames } from '../../../../../../../tests/mocks/data'

const Table = {
  oninit(vnode) {
    this.appState = vnode.attrs.store.getState()
  },
  onbeforeupdate(vnode) {
    this.appState = vnode.attrs.store.getState()
  },
  view(vnode) {
    // const state = vnode.attrs.store.getState()
    // getSingleDataByFilter('opening_timestamp')(state)
    // console.log(getAllFilteredData(state))
    // console.log(getAllFilteredData(state))
    // console.log(allWithOffset(state))
    // console.log(state.getState().issues)

    return m(TableComponent, {
      ...vnode.attrs,
      columns: getHeaderColumnNames(),
      issues: allWithOffset(vnode.state.appState),
    })
  },
}

export default Table
