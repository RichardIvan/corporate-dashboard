/* @flow */
'use strict'

import m from 'mithril'
import f from 'flyd'
import moment from 'moment'

import GraphRangeWidgetComponent from '../components/RangeSelectionWidget'

import { setRange } from '../actions'
import { getRange } from '../selectors'

const GraphRangeWidgetContainer = {
  oninit (vnode) {
    const state = vnode.attrs.store.getState()
    const range = getRange(state)
    vnode.state.appState = state
    vnode.state.inputsDisabled = range.get('range') === 'all' ? f.stream(true) : f.stream(false)
    vnode.state.from = range.get('from')
    vnode.state.to = range.get('to')
  },
  onbeforeupdate (vnode) {
    const state = vnode.attrs.store.getState()
    const range = getRange(state)
    vnode.state.appState = state
    vnode.state.from = range.get('from')
    vnode.state.to = range.get('to')
  },
  view (vnode) {
    return m(GraphRangeWidgetComponent,
      {
        ...vnode.attrs,
        dateAttrs: {
          class: vnode.state.inputsDisabled() ? 'inactive' : ''
        },
        previousButtonAttrs: {
          onclick: () => {
            vnode.state.inputsDisabled(false)
            vnode.attrs.store.dispatch(
              setRange({
                type: 'previous',
                range: 'set',
                from: vnode.state.from,
                to: vnode.state.to
              })
            )
          }
        },
        nextButtonAttrs: {
          onclick: () => {
            vnode.state.inputsDisabled(false)
            vnode.attrs.store.dispatch(
              setRange({
                type: 'next',
                range: 'set',
                from: vnode.state.from,
                to: vnode.state.to
              })
            )
          }
        },
        fromInputAttrs: {
          onchange: (e) => {
            vnode.attrs.store.dispatch(
              setRange({
                range: 'set',
                from: e.target.valueAsNumber
              })
            )
          },
          value: moment(vnode.state.from).format('YYYY-MM-DD'),
          disabled: vnode.state.inputsDisabled()
        },
        toInputAttrs: {
          onchange: (e) => {
            vnode.attrs.store.dispatch(
              setRange({
                range: 'set',
                to: e.target.valueAsNumber
              })
            )
          },
          value: moment(vnode.state.to).format('YYYY-MM-DD'),
          disabled: vnode.state.inputsDisabled()
        },
        rangeButtonAttrs: {
          class: vnode.state.inputsDisabled() ? 'inactive' : 'active',
          onclick: () => {
            vnode.state.inputsDisabled(false)
            vnode.attrs.store.dispatch(
              setRange({
                range: 'set',
                from: vnode.state.from,
                to: vnode.state.to
              })
            )
          }
        },
        allButtonAttrs: {
          class: vnode.state.inputsDisabled() ? 'active' : 'inactive',
          onclick: () => {
            vnode.state.inputsDisabled(true)
            vnode.attrs.store.dispatch(
              setRange({ range: 'all' })
            )
          }
        }
      })
  }
  // view(vnode) {
  //   return m('', m(GraphRangeWidgetComponent,
  //     {
  //       previousButtonHandler: () => {
  //         setRange({
  //           type: 'previous',
  //           range: 'set',
  //           // from: vnode.state.from,
  //         })
  //         vnode.state.inputsDisabled(false)
  //       },
  //       nextButtonHanlder: () => {
  //         setRange({
  //           type: 'next',
  //           range: 'set',
  //           // to: vnode.state.to,
  //         })
  //         vnode.state.inputsDisabled(false)
  //       },
  //       fromDateHandler: (e) => {
  //         setRange({
  //           range: 'set',
  //           from: e.target.valueAsNumber,
  //         })
  //       },
  //       toDateHandler: (e) => {
  //         setRange({
  //           range: 'set',
  //           to: e.target.valueAsNumber
  //         })
  //       },
  //       inputsDisabled: vnode.state.inputsDisabled(),
  //       setRangeButtonHandler: () => {
  //         setRange({
  //           range: 'set',
  //           from: vnode.state.from,
  //           to: vnode.state.to,
  //         })
  //         vnode.state.inputsDisabled(false)
  //       },
  //       allButtonHandler: () => {
  //         setRange({ range: 'all' })
  //         vnode.state.inputsDisabled(true)
  //       },
  //     }
  //   ))
  // }
}

export default GraphRangeWidgetContainer
