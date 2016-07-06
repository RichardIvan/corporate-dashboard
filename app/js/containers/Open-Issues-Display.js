/* @flow */
'use strict'

import m from 'mithril'

import OpenIssuesComponent from '../components/OpenIssues'
import { getOpenIssuesTotal } from '../selectors'

const OpenIssuesContainer = {
  view(vnode) {
    return m(OpenIssuesComponent, {
      total: getOpenIssuesTotal(vnode.attrs.store.getState()).get('total'),
    })
  },
}

export default OpenIssuesContainer
