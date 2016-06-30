/* @flow */
'use strict'

import m from 'mithril'

import PaginationComponent from '../components/Pagination'

import { getTotalNumberOfVisibleItems, getOffset } from '../selectors'

import { setOffset } from '../actions'

import styles from '../components/Pagination/pagination-styles.scss'

const button = (store, type) => m(`.${styles.button}`, {
  onclick: () => store.dispatch(setOffset(type, store.getState())),
})

const paginationDisplay = (store) => {
  const state = store.getState()
  return m(`.${styles['input-container']}`, [
    m('input[type=number][min="1"]', {
      value: getOffset(state) + 1,
      max: getTotalNumberOfVisibleItems(state),
      oninput: (e) => store.dispatch(setOffset(e.target.value, state)),
    }),
    '/',
    m('.pages', getTotalNumberOfVisibleItems(state)),
  ])
}

const PaginationContainer = {
  oninit(vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
  },
  onbeforeupdate(vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
  },
  view(vnode) {
    return m(PaginationComponent, {
      previousButton: button(vnode.attrs.store, 'previous'),
      paginationDisplay: paginationDisplay(vnode.attrs.store),
      nextButton: button(vnode.attrs.store, 'next'),
    })
  },
}

export default PaginationContainer
