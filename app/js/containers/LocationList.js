/* @flow */
'use strict'

import m from 'mithril'

import {
  getListData
} from '../selectors/location-list'

import LocationListComponent from '../components/Location-List'

const constructData = (state) => {
  const info = getListData(state)
  if (info.first().has('issues')) {
    const array = info.reduce((acc, item, key) => {
      const issues = item.get('issues').count()
      const employees = item.get('employees').count()
      if (!issues && !employees) {
        return acc
      }
      acc.push([key, issues, employees])
      return acc
    }, [])
    return array
  }
  return []
}

const LocationListContainer = {
  oninit (vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
  },
  onbeforeupdate (vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
  },
  view (vnode) {
    return m(LocationListComponent, {
      ...vnode.attrs,
      header: {
        text: ['Location', 'Open Issues', 'Active Employees']
      },
      children: {
        items: constructData(vnode.state.appState)
      }
    })
  }
}

export default LocationListContainer
