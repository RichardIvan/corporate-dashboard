/* @flow */
'use strict'

import m from 'mithril'

import filterComponent from '../components/Filter'
import {
  getSelectedFilterMenu,
} from '../selectors'

import {
  getHeaderText,
  isRoot,
} from '../helpers'

import {
  generateCancelButton,
  generateBackButton,
  generateResetButton,
  generateOKButton,
} from '../elements'

import FilterBodyContainer from './FilterBody'

// import {
//   OPENING_TIMESTAMP_TYPE,
//   CLOSING_TIMESTAMP_TYPE,
//   NAME_TYPE,
//   EMAIL_TYPE,
//   EMPLOYEE_TYPE,
//   OPEN_STATUS_TYPE,
//   LOCATION_TYPE,
// } from '../actions/types'
//
// const names = {
//   [OPENING_TIMESTAMP_TYPE]: 'time open',
//   [CLOSING_TIMESTAMP_TYPE]: 'closing time',
//   [NAME_TYPE]: 'name',
//   [EMAIL_TYPE]: 'email',
//   [EMPLOYEE_TYPE]: 'employee name',
//   [OPEN_STATUS_TYPE]: 'status',
//   [LOCATION_TYPE]: 'location',
// }

const FilterContainer = {
  oninit(vnode) {
    vnode.state.selectedFilterMenu = getSelectedFilterMenu(vnode.attrs.store.getState())
  },
  onbeforeupdate(vnode) {
    vnode.state.selectedFilterMenu = getSelectedFilterMenu(vnode.attrs.store.getState())
  },
  view(vnode) {
    return m(filterComponent, {
      // getheadertext by selectedfiltermenu item type
      header: m('h3', getHeaderText(vnode.state.selectedFilterMenu)),
      body: m(FilterBodyContainer, {
        ...vnode.attrs,
      }),
      footer: m('', [
        isRoot(vnode.state.selectedFilterMenu)
        ? generateCancelButton(vnode.attrs.store)
        : generateBackButton(vnode.attrs.store),
        isRoot(vnode.state.selectedFilterMenu)
        ? generateResetButton(vnode.attrs.store)
        : generateOKButton(vnode.attrs.store),
      ]),
    })
  },
}

export default FilterContainer
