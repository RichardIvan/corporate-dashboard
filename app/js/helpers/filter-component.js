/* @flow */
'use strict'

import m from 'mithril'
import moment from 'moment'

import map from 'lodash/map'
import capitalize from 'lodash/upperFirst'

import {
  setFilter,
  setSearchFilterValues,
} from '../actions'

import {
  getSelecterFilterMenu,
  getFilterTimestamp,
  getFilterSearchResults,
  getFilterSearchQuery,
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

function generateSearchBasedBody(state, type) {
  return m('', [
    m('input', {
      oninput: (e) => setSearchFilterValues(type, e.value),
    }),
    m('ul', [
      getFilterSearchQuery(state).length
        ?
        m('li', {
          onclick: () => setFilter(type, getFilterSearchQuery()),
        }, getFilterSearchQuery(state))
        : null,
      map(getFilterSearchResults(state), (result) => {
        m('li', {
          onclick: () => setFilter(type, result),
        }, result)
      }),
    ]),
  ])
}

function onTimeSelection(type, timestampType, e) {
  const value = e.value

  setFilter(type, timestampType, value)
  // fire actionCreator with type, this action is creating action with
  // correnct payload
}

function generateTimeBasedBody(state, type) {
  return m('', [
    m('input[type=date]',
      {
        max: getFilterTimestamp(state, 'to') || moment().format('YYYY-MM-DD'),
        onchange: onTimeSelection.bind(null, type, 'from'),
      }, 'From '),
    m('input[type=date]',
      {
        min: getFilterTimestamp(state, 'from'),
        onchange: onTimeSelection.bind(null, type, 'to'),
      }, 'To'),
  ])
}

function radioBasedBody(type) {
  return m('.radio', [
    m('input[type=radio]',
      {
        onclick: () => setFilter(type, 'open'),
      }, 'Open'),
    m('input[type=radio]',
      {
        onclick: () => setFilter(type, 'closed'),
      }, 'Closed'),
  ])
}

export function getBodyByType(state, type: string) {
  switch (type) {
  case OPENING_TIMESTAMP_TYPE:
  case CLOSING_TIMESTAMP_TYPE:
    return generateTimeBasedBody(state, type)
  case NAME_TYPE:
  case EMAIL_TYPE:
  case LOCATION_TYPE:
  case EMPLOYEE_TYPE:
    return generateSearchBasedBody(state, type)
  default:
    return radioBasedBody(type)
  }
}

export function getHeaderText(selectedMenu: string): string {
  return selectedMenu === 'root' ? 'Filter by' : `${capitalize(names[selectedMenu])} Filter`
}

export function getNameByType(type: string) {
  return names[type]
}

export function isRoot(selectedMenu: string) {
  return selectedMenu === 'root'
}
