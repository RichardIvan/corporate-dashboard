/* @flow */
'use strict'

// import { configureStore } from './store'
// import { mountRoot, mountRoute } from './containers'

// const store = configureStore()
// mountRoot(body, { store })

import { mountRoute } from './containers'

const body = document.getElementsByTagName('body')[0]

mountRoute(body)
