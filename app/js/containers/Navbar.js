/* @flow */
'use strict'

import m from 'mithril'
import NavbarComponent from '../components/Navbar'

import mapIcon from '../../svg/map-icon'

const iconsArray = [mapIcon]

const Navbar = {
  view(): Object {
    return m(NavbarComponent, { icons: iconsArray })
  },
}

export default Navbar
