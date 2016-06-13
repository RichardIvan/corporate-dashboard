
import m from 'mithril'

import TableHeaderComponent from '../../../../../../components/TableHeader'
import { mockedIssue } from '../../../../../../../../tests/mocks/data'

const mockedVidibleData = (issue) => {
  const array = new Array(9).fill('')
  array.map(() => issue)
  return array
}

// console.log(mockedVidibleData(mockedIssue))

const TableHeader = {
  view() {
    return m(TableHeaderComponent, { issues: mockedVidibleData(mockedIssue) })
  },
}

export default TableHeader
