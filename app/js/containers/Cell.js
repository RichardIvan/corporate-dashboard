'use strict'

import m from 'mithril'

import CellComponent from '../components/Cell'

import {
  NAME_TYPE,
  EMAIL_TYPE,
  DESCRIPTION_TYPE,
  EMPLOYEE_TYPE,
  LOCATION_TYPE
} from '../actions'

function shouldHaveTooltip (type) {
  const withTooltips = [
    NAME_TYPE,
    EMAIL_TYPE,
    DESCRIPTION_TYPE,
    EMPLOYEE_TYPE,
    LOCATION_TYPE
  ]
  // console.log((withTooltips.indexOf(type) !== -1) ? true : false)

  return (withTooltips.indexOf(type) !== -1)
}

const Cell = {
  oninit (vdom) {
    // console.log(vdom)
    if (shouldHaveTooltip(vdom.attrs.cellData.type)) {
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
      cellEventHandlers: {
        onmouseover: (vdom.attrs.cellData.data && shouldHaveTooltip(vdom.attrs.cellData.type)
                      ? () => {
                        vdom.state.fullTextVisible = true
                      }
                      : null),
        onclick: (vdom.attrs.cellData.data && shouldHaveTooltip(vdom.attrs.cellData.type)
                      ? () => {
                        vdom.state.fullTextVisible = true
                      }
                      : null),
        onmouseleave: () => {
          vdom.state.fullTextVisible = false
        }
      }
    })
  }
}

export default Cell
