/* @flow */
'use strict'

import m from 'mithril'
import application from './components/app_component/app-component'

import '../css/global-styles.scss'
import '../fonts/Roboto-Regular.ttf'

const body = document.getElementsByTagName('body')[0]

m.mount(body, application)
