'use strict'

import m from 'mithril'
import GraphComponent from '../components/Graph'

import RangeSelectionWidget from './GraphRangeSelectionWidget'
import OpenIssuesContainer from './Open-Issues-Display'
import ChartContainer from './Charts'

const Graph = {
  view(vnode) {
    return m(GraphComponent, {
      // ChartsContainer,
      Chart: m(ChartContainer, { ...vnode.attrs }),
    }, [
      m(RangeSelectionWidget, { ...vnode.attrs }),
      m(OpenIssuesContainer, { ...vnode.attrs }),
    ])

    // DATE WIDGET

    // has an option to select all vs specific range
    // tis option is used by the two other components

    // has a date selection widget on the left top side
      // this widget is being adjusted by either clicking
      // arrows on each side
      // or by owerwriting on of the dates on the widgets
      // where the other date will adjust automatically

    // has two buttons, one is range, one is all
    // if range is clicked, the range inputs are geiven different class
    // if all is selected range is grayed out


    // TOTAL ISSUES WIDGET

    // on the right, we have total of open issues - number, for start
    // https://codepen.io/kindofone/pen/DkhAz
    // http://flipclockjs.com/


    // CHART WIDGET

    // these two graphs might be together in one

    // bellow we have a line charts with total of paying customers over time

    // bellow we have a bar chart with reported issues over period of time
  },
}

export default Graph
