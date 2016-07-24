/* @flow */
'use strict'

import m from 'mithril'
import MobileNavbarComponent from '../components/Mobile-Navbar'

import {
  GEOSPACIAL,
  GRAPHS,
  DATA
} from '../actions/constants'

import mapIcon from '../../svg/map-icon'
import graphIcon from '../../svg/graph-icon'
import dataIcon from '../../svg/data-icon'

const icons = [mapIcon, graphIcon, dataIcon]
const routeName = {
  geo: GEOSPACIAL,
  graph: GRAPHS,
  data: DATA
}

import {
  setMobileNavbarOpenState
} from '../actions/'

import {
  isOpen
} from '../selectors/mobile-navbar'
// const isOpen = () => true

const MobileNavbar = {
  view (vnode: Object): Object {
    return m(MobileNavbarComponent,
      {
        ...vnode.attrs,
        icons,
        routeName,
        isOpen: isOpen(vnode.attrs.store.getState()),
        onclick: (path) => () => {
          m.route.set(`/dashboard/${path}`)
          setMobileNavbarOpenState(false)
        }
      }
    )
  }
}

export default MobileNavbar
