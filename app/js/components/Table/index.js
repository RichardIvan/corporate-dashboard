'use strict'

import m from 'mithril'

import styles from './styles.scss'

const Table = {
  view(vdom) {
    // console.log(vdom)
    return m(`ul.${styles.table}`, [
      // 'Hey',
      vdom.attrs.columns.map((column, index) => {
        return m(`li.${styles.column}`,
          {
            class: index === 2 ? `${styles.three}` : '',
          },
          m(`ul.${styles.contentColumn}`, [
            // return header cell here
            m(`li.${styles.header}`, m('p', column)),
            vdom.attrs.issues.map((issue, i) => {
              // return cells here
              return m(`li.${styles.row}`,
                {
                  class: (i % 2 !== 0) ? `${styles.dimmed}` : '',
                },
                m('p', issue[index]))
              // issue.map((field) => m('li', m('p', field)))
            }),
          ]))
        }),
      ])
    },
}

export default Table
