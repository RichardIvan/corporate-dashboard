import m from 'mithril'

import HeaderComponent from '../../../../../../components/TableHeader'

// import HeaderRowContainer from './Header'
// import DataTableContainer from './DataTable'
import { mockedHeaderColumnNames } from '../../../../../../../../tests/mocks/data'

const Header = {
  view(vdom) {
    return m(HeaderComponent, {
      ...vdom.attrs,
      columns: mockedHeaderColumnNames,
    })
  },
}

export default Header
