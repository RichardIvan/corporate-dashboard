/* @flow */
'use strict'

import m from 'mithril'
import f from 'flyd'

import GraphRangeWidgetComponent from '../components/RangeSelectionWidget'

import { setRange } from '../actions'

const GraphRangeWidgetContainer = {
  oninit(vnode) {
    const state = vnode.store.getState()
    vnode.state.inputsDisabled = f.stream(true)
    vnode.state.from = getRange(state).get('from')
    vnode.state.to = getRange(state).get('to')
  },
  view(vnode) {
    return m('', m(GraphRangeWidgetComponent),
      {
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
            vnode.state.inputsDisabled(false)
          },
        },
        allButtonAttrs: {
          class: vnode.state.inputsDisabled() ? 'active' : 'inactive',
          onclick: () => {
            setRange({ range: 'all' })
            vnode.state.inputsDisabled(true)
          },
        },
      }
    )
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
