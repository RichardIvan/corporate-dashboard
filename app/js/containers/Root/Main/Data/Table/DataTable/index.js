
import m from 'mithril'

import DataTableComponent from '../../../../../../components/DataTable/'
import { mockedIssue } from '../../../../../../../../tests/mocks/data'

const mockedVidibleData = (issue) => {
  let array = new Array(9).fill('')
  array = array.map(() => Object.keys(issue).map((key) => issue[key]))
  return array
}

// console.log(mockedVidibleData(mockedIssue))

const DataTable = {
  view(vdom) {
    // return m('.hey')
    return m(DataTableComponent, {
      ...vdom.attrs,
      issues: mockedVidibleData(mockedIssue),
    })
  },
}

export default DataTable
