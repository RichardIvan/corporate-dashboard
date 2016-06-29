/* @flow */
'use strict'

import m from 'mithril'

import {
  resetFilters,
  closeFilterMenu,
  filterComponentBack,
} from '../actions'

// TODO fill the onclick handlers for buttons
export function generateResetButton(store) {
  return m('button',
    {
      onclick: () => store.dispatch(resetFilters()),
    },
    'Reset'
  )
}

export function generateCancelButton(store) {
  return m('button',
    {
      onclick: () => store.dispatch(closeFilterMenu()),
    },
    'Cancel'
  )
}

export function generateOKButton(store) {
  return m('button',
    {
      onclick: () => store.dispatch(filterComponentBack()),
    },
    'OK'
  )
}

export function generateBackButton(store) {
  return m('button',
    {
      onclick: () => store.dispatch(filterComponentBack()),
    },
    'Back'
  )
}
