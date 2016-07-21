'use strict'

import m from 'mithril'

import TableComponent from '../components/Table'

import { getHeaderColumnNames } from '../../../tests/mocks/data'
// import { getVisible } from '../selectors'
import { getVisibleIssues } from '../selectors'

const Table = {
  oninit (vnode) {
    this.appState = vnode.attrs.store.getState()
  },
  onbeforeupdate (vnode) {
    this.appState = vnode.attrs.store.getState()
  },
  view (vnode) {
    return m(TableComponent, {
      ...vnode.attrs,
      columns: getHeaderColumnNames(),
      issues: getVisibleIssues(vnode.state.appState)
    })
  }
}

export default Table
