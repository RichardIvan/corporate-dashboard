'use strict'

import m from 'mithril'

import { GEO, GRAPH, DATA, ISSUES, OPEN_ISSUES } from './constants'
import filterIcon from '../../icons/google/msvg/content/filter-list'
import { openFilterMenu } from '../actions'
// TODO write test for isfiltermenuopen
import { isFiltermenuOpen } from '../selectors'
import FilterContainer from '../containers/Filter'

import styles from './toolbar.scss'

export function resolveHeading(container: string, route: string) {
  switch (route) {
  case 'graph':
    return container === 'root' ? GRAPH : ISSUES
  case 'data':
    return container === 'root' ? DATA : ISSUES
  default:
    return container === 'root' ? GEO : OPEN_ISSUES
  }
}

export function renderChildren(attrs) {
  if (attrs.route === 'data') {
    const button = m(`.${styles.icon}`,
      {
        onclick: () => { attrs.store.dispatch(openFilterMenu()) },
      }, filterIcon
    )
    const FilterMenu = m(FilterContainer, { ...attrs })

    return [
      button,
      isFiltermenuOpen(attrs.store.getState()) ? FilterMenu : null,
    ]
  }
  return null
}
