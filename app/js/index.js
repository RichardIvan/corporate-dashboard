/* @flow */
'use strict'

import { configureStore } from './store'
import { mountRoot } from './containers'

const store = configureStore()

const body = document.getElementsByTagName('body')[0]
mountRoot(body, { store })
