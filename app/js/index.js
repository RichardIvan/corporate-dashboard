/* @flow */
'use strict'

import m from 'mithril'

import { configureStore } from './store'
import { mountRoot } from './containers'

const store = configureStore()

const body = document.getElementsByTagName('body')[0]
mountRoot(body, { store })
