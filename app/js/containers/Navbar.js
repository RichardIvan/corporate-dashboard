/* @flow */
'use strict'

import m from 'mithril'
import NavbarComponent from '../components/Navbar'

import mapIcon from '../../svg/map-icon'
import graphIcon from '../../svg/graph-icon'
import dataIcon from '../../svg/data-icon'

const icons = [mapIcon, graphIcon, dataIcon]

const Navbar = {
  view(): Object {
    return m(NavbarComponent, { icons })
  },
}

export default Navbar
