/* @flow */
'use strict'

import m from 'mithril'
import map from 'lodash/map'

import FilterBodyComponent from '../components/FilterBody'

import {
  getBodyByType,
  isRoot,
  getNameByType,
} from '../helpers'

import {
  selectFilterMenu,
} from '../actions'

import {
  getAllFilters,
  getSelectedFilterMenu,
} from '../selectors'

const CrossIcon = 'I'

const FilterBody = {
  oninit(vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
    vnode.state.selectedFilterMenu = getSelectedFilterMenu(vnode.state.appState)
  },
  onbeforeupdate(vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
    vnode.state.selectedFilterMenu = getSelectedFilterMenu(vnode.state.appState)
  },
  view(vnode) {
    return m(FilterBodyComponent, {
      body:
        isRoot(vnode.state.selectedFilterMenu)
        ? m('ul', [
          getAllFilters(vnode.state.appState).toArray().map((filter) =>
            m('li', {
              onclick: () => vnode.attrs.store.dispatch(selectFilterMenu(filter.get('type'))),
            } ,[
              m('p', getNameByType(filter.get('type'))),
              filter.get('active') ? m('span', '✓') : null,
            ])
          ),
        ])
        : getBodyByType(vnode.attrs.store, vnode.state.selectedFilterMenu),
    })
  },
}

export default FilterBody
