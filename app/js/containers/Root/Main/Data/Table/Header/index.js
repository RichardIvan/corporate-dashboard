import m from 'mithril'

import TableHeaderComponent from '../../../../../../components/TableHeader'

// import HeaderRowContainer from './Header'
// import DataTableContainer from './DataTable'
import { mockedHeaderColumnNames } from '../../../../../../../../tests/mocks/data'

const Header = {
  view(vdom) {
    return m(TableHeaderComponent, {
      ...vdom.attrs,
      columns: mockedHeaderColumnNames,
    })
  },
}

export default Header
