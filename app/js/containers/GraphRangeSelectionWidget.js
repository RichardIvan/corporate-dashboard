/* @flow */
'use strict'

import m from 'mithril'
import f from 'flyd'

import GraphRangeWidgetComponent from '../components/RangeSelectionWidget'

import { setRange } from '../actions'
import { getRange } from '../selectors'

const GraphRangeWidgetContainer = {
  oninit(vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
    vnode.state.inputsDisabled = f.stream(true)
    vnode.state.from = getRange(vnode.state.appState).get('from')
    vnode.state.to = getRange(vnode.state.appState).get('to')
  },
  onbeforeupdate(vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
    vnode.state.from = getRange(vnode.state.appState).get('from')
    vnode.state.to = getRange(vnode.state.appState).get('to')
  },
  view(vnode) {
    return m(GraphRangeWidgetComponent,
      {
        dateAttrs: {
          class: vnode.state.inputsDisabled() ? 'inactive' : '',
        },
        previousButtonAttrs: {
          onclick: () => {
            setRange({
              type: 'previous',
              range: 'set',
              // from: vnode.state.from,
            })
            vnode.state.inputsDisabled(false)
          },
        },
        nextButtonAttrs: {
          onclick: () => {
            setRange({
              type: 'next',
              range: 'set',
              // to: vnode.state.to,
            })
            vnode.state.inputsDisabled(false)
          },
        },
        fromInputAttrs: {
          onchange: (e) => {
            setRange({
              range: 'set',
              from: e.target.valueAsNumber,
            })
          },
          disabled: vnode.state.inputsDisabled(),
        },
        toInputAttrs: {
          onchange: (e) => {
            setRange({
              range: 'set',
              to: e.target.valueAsNumber,
            })
          },
          disabled: vnode.state.inputsDisabled(),
        },
        rangeButtonAttrs: {
          class: vnode.state.inputsDisabled() ? 'inactive' : 'active',
          onclick: () => {
            setRange({
              range: 'set',
              from: vnode.state.from,
              to: vnode.state.to,
            })
            console.log(vnode.state.inputsDisabled())
            vnode.state.inputsDisabled(false)
            console.log(vnode.state.inputsDisabled())
          },
        },
        allButtonAttrs: {
          class: vnode.state.inputsDisabled() ? 'active' : 'inactive',
          onclick: () => {
            setRange({ range: 'all' })
            console.log(vnode.state.inputsDisabled())
            vnode.state.inputsDisabled(true)
            console.log(vnode.state.inputsDisabled())
          },
        },
      })
  },
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
