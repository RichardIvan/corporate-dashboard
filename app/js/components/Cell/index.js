/* @flow */
'use strict'

import m from 'mithril'

const CellComponent = {
  view(vdom) {
    return m('p', vdom.attrs.cellData.value)
  },
}

export default CellComponent
