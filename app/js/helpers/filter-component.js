/* @flow */
'use strict'

import m from 'mithril'
import moment from 'moment'

import map from 'lodash/map'
import capitalize from 'lodash/upperFirst'
import includes from 'lodash/includes'
import uniqBy from 'lodash/uniqBy'

import {
  setFilter,
  setSearchFilterValues,
} from '../actions'

import {
  getSelecterFilterMenu,
  getFilterTimestamp,
  getFilterSearchResults,
  getFilterSearchQuery,
  getSingleDataByFilter,
  getFilter,
  getDataByType,
  getFilterMenuResults,
} from '../selectors'

import {
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  NAME_TYPE,
  EMAIL_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
} from '../actions/types'

const names = {
  [OPENING_TIMESTAMP_TYPE]: 'opening time',
  [CLOSING_TIMESTAMP_TYPE]: 'closing time',
  [NAME_TYPE]: 'name',
  [EMAIL_TYPE]: 'email',
  [EMPLOYEE_TYPE]: 'employee name',
  [OPEN_STATUS_TYPE]: 'status',
  [LOCATION_TYPE]: 'location',
}

import styles from '../components/FilterBody/styles.scss'

function generateSearchBasedBody(store, type) {
  const state = store.getState()
  const filteredBy = getFilter(type, state).by
  return m('', [
    m('label', `Search ${names[type]}:`),
    m('input[autofocus=true][placeholder=Search]', {
      oninput: (e) => store.dispatch(setSearchFilterValues(type, e.target.value, state)),
    }),
    m('ul', [
      uniqBy(
        map((getFilterSearchQuery(state).length === 0)
          ? getDataByType(type, state)
          : getFilterMenuResults(state),
            (result) => {
              return m('li', {
                key: result[0],
                onclick: () => {
                  store.dispatch(setFilter(type, result[1]))
                },
              },
              [
                m('p', result[1]),
                includes(filteredBy, result[1])
                  ? m('span', '✓')
                  : '',
              ])
            }
          )
        , (result) => result.children[0].text),
      ]),
  ])
}

function generateTimeBasedBody(store, type) {
  const state = store.getState()
  return m(`.${styles.time}`, [
    m('label', 'Time'),
    m('input[type=date]',
      {
        max: getFilterTimestamp(state, 'to') || moment().format('YYYY-MM-DD'),
        value: moment(getFilter(type, state).timestamp).format('YYYY-MM-DD'),
        onchange: (e) => {
          store.dispatch(setFilter(type, e.target.valueAsNumber))
        },
      }, 'Time '),
  ])
}

function radioBasedBody(store, type) {
  return m(`form.${styles.radio}`, [
    m('li', [
      m(`input[type=radio][name=status].${styles['radio-input']}`,
        {
          onclick: (e) => store.dispatch(setFilter(type, e.target.value)),
          value: 'open',
      }),
      m('span', 'Open'),
    ]),
    m('li', [
      m(`input[type=radio][name=status].${styles['radio-input']}`,
        {
          onclick: (e) => store.dispatch(setFilter(type, e.target.value)),
          value: 'closed',
        }
      ),
      m('span', 'Closed'),
    ]),
  ])
}

export function getBodyByType(store, type: string) {
  switch (type) {
  case OPENING_TIMESTAMP_TYPE:
  case CLOSING_TIMESTAMP_TYPE:
    return generateTimeBasedBody(store, type)
  case NAME_TYPE:
  case EMAIL_TYPE:
  case LOCATION_TYPE:
  case EMPLOYEE_TYPE:
    return generateSearchBasedBody(store, type)
  default:
    return radioBasedBody(store, type)
  }
}

export function getHeaderText(selectedMenu: string): string {
  return selectedMenu === 'root' ? 'Filter by' : `${capitalize(names[selectedMenu])} Filter`
}

export function getNameByType(type: string) {
  return capitalize(names[type])
}

export function isRoot(selectedMenu: string) {
  return selectedMenu === 'root'
}
