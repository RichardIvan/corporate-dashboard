/* @flow */
'use strict'

import { Map } from 'immutable'
import m from 'mithril'
import render from 'mithril-node-render'
import style from '../../components/Location-List/location-list-style.scss'

export function getListData (state: Object): Map {
  return state.locationList.value.get('data')
}

const renderInfoWindow = (item, state) => {
  const name = item.get('name')
  return render(m(`.${style.content}`, [
    m('h2', name),
    m(`ul.${style.data}`, [
      m(`.${style.tooltipRow}`, [
        m('li', 'Issues'),
        m('li', item.get('issues') ? item.get('issues').count() : 0)
      ]),
      m(`.${style.tooltipRow}`, [
        m('li', 'Empl.'),
        m('li', item.get('employees') ? item.get('employees').count() : 0)
      ])
    ])
  ]))
  // const info = getListData(state)
  // if (info.first().has('issues')) {
  //   const array = info.reduce((acc, item, key) => {
  //     acc.push([key, item.get('issues').count(), item.get('employees').count()])
  //     return acc
  //   }, [])
  //   return array
  // }
  // return []
}

export function getActiveLocation (state) {
  const active = state.locationList.value.get('active')
  if (active) {
    const data = state.locationList.value.getIn(['data', active])
    const result = new Map()
    return result.set('content', renderInfoWindow(data, state))
                  .set('position', data.get('center'))
                  .set('name', active)
    // return state.locationList.value.getIn(['data', active])
  }
  return false
}
