'use strict'

import m from 'mithril'

import GeospacialComponent from '../components/Geospacial'
import Map from '../containers/Map'

import {
  getOpenIssuesTotal,
  isMobile
} from '../selectors'

const Geospacial = {
  view (vnode) {
    return isMobile(vnode.attrs.store.getState())
      ? m(Map, { ...vnode.attrs, key: 'map' })
      : m(GeospacialComponent, {
        ...vnode.attrs,
        key: 'geo',
        openIssuesTotal: getOpenIssuesTotal(vnode.attrs.store.getState()).get('total')
      })
  }
}

export default Geospacial
