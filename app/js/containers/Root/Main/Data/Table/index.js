'use strict'

import m from 'mithril'

import TableComponent from '../../../../../../../app/js/components/Table'

import HeaderRowContainer from './Header'
import DataTableContainer from './DataTable'
// headerColumns,

// import { mockedHeaderColumnNames } from '../../../../../../../tests/mocks/data'

const Table = {
  view(vdom) {
    return m(TableComponent, {
      ...vdom.attrs,
      tableHeaderRow: HeaderRowContainer,
      dataTable: DataTableContainer,
    })
  },
}

export default Table
