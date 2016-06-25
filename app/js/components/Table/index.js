'use strict'

import m from 'mithril'

import CellContainer from '../../containers/Cell'

import {
  setSort,
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  STATUS_TYPE,
} from '../../actions'

import styles from './styles.scss'

const sortableItems = [
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  STATUS_TYPE,
]

function headerClickHandler(type) {
  if (sortableItems.indexOf(type) !== -1) {
    this.attrs.store.dispatch(setSort(type))
  }
}

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
            // Header Cell
            m(`li.${styles.header}`,
              {
                onclick: headerClickHandler.bind(vdom, column.type),
              }, m('p', column.name)),
            // rows
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
