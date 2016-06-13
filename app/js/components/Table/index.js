'use strict'

import m from 'mithril'

const TableComponent = {
  view(vdom) {
    return m('', [
      m(vdom.attrs.tableHeaderRow),
      m(vdom.attrs.dataTable),
    ])
  },
}

export default TableComponent
