'use strict'

import m from 'mithril'

import styles from './styles.scss'

const TableHeaderComponent = {
  view(vdom) {
    // console.log(vdom)
    return m(`ul.${styles.tableHeader}`, [
      // 'Hey',
      vdom.attrs.columns.map((column) => m('li', m('p', column))),
    ])
  },
}

export default TableHeaderComponent
