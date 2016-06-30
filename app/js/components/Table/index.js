'use strict'

import m from 'mithril'

import CellContainer from '../../containers/Cell'
import Icon from '../../containers/Icon'

import { getSortBy } from '../../selectors/filter-folder'

import {
  setSort,
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
} from '../../actions'

import styles from './styles.scss'

const sortableItems = [
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
]

function isSortable(type) {
  return (sortableItems.indexOf(type) !== -1)
}

function isSortActive(type, state) {
  // TODO write getSort selector
  return getSortBy(state).type === type
}

function isAsc(state) {
  return getSortBy(state).asc
}

function headerClickHandler(type) {
  if (isSortable(type)) {
    const store = this.attrs.store
    this.attrs.store.dispatch(setSort(type, store.getState()))
  }
}

const Table = {
  view(vdom) {
    const state = vdom.attrs.store.getState()
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
              },
              [
                // console.log(isSortActive(column.type, state)),
                // console.log(isAsc(state)),
                m('p', column.name),
                (isSortable(column.type) && isSortActive(column.type, state)) ? m(Icon,
                  {
                    type: 'arrow',
                    className: isAsc(state) ? 'asc' : 'desc',
                  }
                ) : null,
              ]
            ),
            // rows
            vdom.attrs.issues.toArray().map((issue, i) => {
              if (issue && issue.count()) {
                return m(`li.${styles.row}`,
                  {
                    class: (i % 2 !== 0) ? `${styles.dimmed}` : '',
                  },
                  m(CellContainer, {
                    ...vdom.attrs,
                    issue,
                    cellData: {
                      data: issue.get(column.type),
                      value: issue.getIn([column.type, 'transformed']),
                      type: column.type,
                    },
                  })
                )
              } else {
                return m('li')
              }
            }),
            // vdom.attrs.issues.map((issue, i) => {
            //   return m(`li.${styles.row}`,
            //     {
            //       class: (i % 2 !== 0) ? `${styles.dimmed}` : '',
            //     },
            //     m(CellContainer, {
            //       ...vdom.attrs,
            //       issue,
            //       cellData: {
            //         data: issue[column.type],
            //         value: issue[column.type] ? issue[column.type].transformed : '',
            //         type: column.type,
            //       },
            //     })
            //   )
            //   // issue.map((field) => m('li', m('p', field)))
            // }),
          ]))
      }),
    ])
  },
}

export default Table
