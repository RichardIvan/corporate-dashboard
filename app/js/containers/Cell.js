'use strict'

import m from 'mithril'

import CellComponent from '../components/Cell'

const Cell = {
  view(vdom) {
    return m(CellComponent, {
      ...vdom.attrs,
    })
  },
}

export default Cell
