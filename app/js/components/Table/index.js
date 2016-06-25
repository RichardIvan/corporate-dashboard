'use strict'

import m from 'mithril'

import CellContainer from '../../containers/Cell'

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
            m(`li.${styles.header}`, m('p', column.name)),
            vdom.attrs.issues.map((issue, i) => {
              return m(`li.${styles.row}`,
                {
                  class: (i % 2 !== 0) ? `${styles.dimmed}` : '',
                },
                m(CellContainer, {
                  ...vdom.attrs,
                  issue,
                  cellData: {
                    data: issue[column.type],
                    value: issue[column.type] ? issue[column.type].transformed : '',
                    type: column.type,
                  },
                })
              )
              // issue.map((field) => m('li', m('p', field)))
            }),
          ]))
      }),
    ])
  },
}

export default Table
