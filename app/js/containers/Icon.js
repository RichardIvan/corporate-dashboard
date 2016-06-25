/* @flow */
'use strict'

import m from 'mithril'

import IconContainer from '../containers/Icon'

import arrowIcon from '../../svg/arrow-icon'

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
    return m(IconContainer, {
      icon: getIcon(vdom.attrs.type),
      className: vdom.attrs.className,
    })
  },
}

export default Icon
