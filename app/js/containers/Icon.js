/* @flow */
'use strict'

import m from 'mithril'

import IconComponent from '../components/Icon'

import arrowIcon from '../../icons/google/msvg/hardware/keyboard-arrow-up'

function getIcon(type) {
  switch (type) {
  case 'arrow':
    return arrowIcon
  default:
    return arrowIcon
  }
}

const Icon = {
  view(vdom) {
    return m(IconComponent, {
      icon: getIcon(vdom.attrs.type),
      className: vdom.attrs.className,
    })
  },
}

export default Icon
