/* @flow */
'use strict'

import m from 'mithril'


// TODO fill the onclick handlers for buttons
export const resetButton = m('button',
  {
    onclick: 'resetFiltersAction',
  },
  'Reset'
)

export const cancelButton = m('button',
  {
    onclick: 'closeFilterSectionAction',
  },
  'Cancel'
)

const handleOKClick = function(e) {
  // trigger setting of tilter and closing of the filter menu

}

export const okButton = m('button',
  {
    onclick: 'resetFilterSectionAction',
  },
  'OK'
)

export const backButton = m('button',
  {
    onclick: 'resetFilterSectionAction',
  },
  'Back'
)
