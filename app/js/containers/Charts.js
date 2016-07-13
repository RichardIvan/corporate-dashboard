/* @flow */
'use strict'

import m from 'mithril'
import f from 'flyd'
import moment from 'moment'

import {
  List,
} from 'immutable'

import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

if (isEmpty(process.env)) {
  require('amcharts3/amcharts/amcharts')
  require('amcharts3/amcharts/serial')
  const amcharts = window.AmCharts
}

import styles from '../components/Charts/chart-styles.scss'

import ChartComponent from '../components/Charts'

// import armcharts
import { generateChart } from '../services'
import { getChartData } from '../selectors/'

const ChartContainer = {
  oninit(vnode) {
    // const state = vnode.attrs.store.getState()
    vnode.state.chartData = [
      {
        date: moment().format('DD/MM/YY'),
        payingCustomersData: 5,
        openIssuesData: 10,
      }
    ]
  },
  onupdate(vnode) {
    if (!vnode.state.chart) return false

    const state = vnode.attrs.store.getState()
    // const types = List.of('payingCustomersData')
    const newData = getChartData(state).toJS()

    if (vnode.state.chart) {
      if (newData) {
        if (!isEqual(vnode.state.chartData, newData)) {
          const length = newData.length
          // const len = vnode.state.chartData.length
          // vnode.state.chartData.concat(newData)
          // vnode.state.chartData.splice(len, -1)
          newData.forEach((item, index) => {
            vnode.state.chartData[index] = item
          })
          vnode.state.chartData.splice(length)
          // vnode.state.chartData.reduce((items, item, index) => {
          //   const newItem = newData[index]
          //   if(newItem) {
          //     items.push(newItem)
          //   }
          //   return items
          // }, [])
          // console.log(vnode.state.chartData)
          // console.log(newData)
          //
          // vnode.state.chartData = newData
          vnode.state.chart.validateData()
        }
      }
    }
  },
  oncreate(vnode) {
    const state = vnode.attrs.store.getState()

    vnode.state.chart = AmCharts.makeChart(vnode.dom, generateChart(state, vnode.state.chartData))
  },
  view(vnode) {
    return m(`.${styles.innerContainer}`, m(''))
  }
}



export default ChartContainer
