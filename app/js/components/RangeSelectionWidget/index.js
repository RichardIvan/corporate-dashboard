/* @flow */
'use strict'

import m from 'mithril'

import leftArrow from '../../../icons/google/msvg/hardware/keyboard-arrow-left'
import rightArrow from '../../../icons/google/msvg/hardware/keyboard-arrow-right'

import styles from './range-selection-widget-styles.scss'

import {
  isMobile
} from '../../selectors'

const RangeSelectionWidgetComponent = {
  oninit (vnode) {
    this.appState = vnode.attrs.store.getState()
    this.isMobile = isMobile(this.appState)
  },
  onbeforeupdate (vnode) {
    this.appState = vnode.attrs.store.getState()
    this.isMobile = isMobile(this.appState)
  },
  view (vnode) {
    return m(`.${styles.container}`,
      m(`.${styles['inner-container']}`,
        [
          !this.isMobile
          ? m(`button.${styles.previous}`,
            vnode.attrs.previousButtonAttrs,
            m('span', leftArrow)
          )
          : null,
          m(`.${styles.mainInputs}`,
            [
              m(`.${styles.dates}`,
                vnode.attrs.dateAttrs,
                [
                  m(`.${styles.fromContainer}`,
                    [
                      m('label[for=rangeFrom]', 'from'),
                      m('input[type=date][id=rangeFrom]',
                        vnode.attrs.fromInputAttrs,
                      )
                    ]
                  ),
                  m(`.${styles.toContainer}`,
                    [
                      m('label[for=rangeTo]', 'to'),
                      m('input[type=date][id=rangeTo]',
                        vnode.attrs.toInputAttrs,
                      )
                    ]
                  )
                ]
              ),
              m(`.${styles.rangeButtons}`,
                [
                  m('button.range-button',
                    vnode.attrs.rangeButtonAttrs,
                    'Set Range'),
                  m('button.all-button',
                    vnode.attrs.allButtonAttrs,
                    'All')
                ]
              )
            ]
          ),
          !this.isMobile
          ? m(`button.${styles.next}`,
            vnode.attrs.nextButtonAttrs,
            m('span', rightArrow)
          )
          : null
        ]
      )
    )
  }
}

export default RangeSelectionWidgetComponent
