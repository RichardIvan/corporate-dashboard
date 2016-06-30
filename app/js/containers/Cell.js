'use strict'

import m from 'mithril'

import CellComponent from '../components/Cell'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  DESCRIPTION_TYPE,
  EMPLOYEE_TYPE,
  LOCATION_TYPE,
} from '../actions'


const mouseOverHandler = function (visibleStatus, e) {

  // console.log(!this.fullTextVisible)
  // this.fullTextVisible = !this.fullTextVisible
  visibleStatus = !visibleStatus
  console.log(visibleStatus)
}

function shouldHaveTooltip(type) {
  const withTooltips = [
    NAME_TYPE,
    EMAIL_TYPE,
    DESCRIPTION_TYPE,
    EMPLOYEE_TYPE,
    LOCATION_TYPE,
  ]
  // console.log((withTooltips.indexOf(type) !== -1) ? true : false)

  return (withTooltips.indexOf(type) !== -1) ? true : false
}

const Cell = {
  oninit(vdom) {
    // console.log(vdom)
    if(shouldHaveTooltip(vdom.attrs.cellData.type)) {
      vdom.state.fullTextVisible = false
    }
    // vdom.attrs.cellData.data
    //       ? (
    //           vdom.attrs.cellData.data.original
    //           !==
    //           vdom.attrs.cellData.data.transformed
    //         )
    //         ? false
    //         : null
    //       : null,
  },
  view(vdom) {
    return m(CellComponent, {
      ...vdom.attrs,
      key: `${vdom.attrs.issue.getIn(['id', 'original'])}-${vdom.attrs.cellData.type}-component`,
      shortText: vdom.attrs.cellData.data
            ? vdom.attrs.cellData.data.get('transformed')
            : '',
      fullText: vdom.attrs.cellData.data && shouldHaveTooltip(vdom.attrs.cellData.type)
                ? vdom.attrs.cellData.data.get('original')
                : '',
      fullTextVisible: vdom.state.fullTextVisible,
      onmouseover: (vdom.attrs.cellData.data && shouldHaveTooltip(vdom.attrs.cellData.type)
                    ? () => vdom.state.fullTextVisible = true
                    : null),
      onmouseleave: (() => vdom.state.fullTextVisible = false),
    })
  },
}

export default Cell
