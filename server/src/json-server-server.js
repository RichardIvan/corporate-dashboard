/* @flow */
'use strict'

import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'
import last from 'lodash/last'

var jsonServer = require('json-server')
const express = require('express')

import Server from 'socket.io'
const io = new Server(3333)

import {
  generatePayingCustomerData
} from './helpers/paying-customers'

import {
  transformFirebaseEntryToCSV
} from './helpers/transformer'

import {
  startServerPush
} from './helpers/server-push'

// import {
//   fetchFirebase
// } from './helpers/firebase'

import {
  fetchData
} from './helpers/data'

import {
  initialFetch,
  deletedItem,
  pushData
} from './actions'
// const http = require('http')

var server = jsonServer.create()

var router = jsonServer.router('./server/db.json')
// var router = jsonServer.router('./server/dev-db.json')
var middlewares = jsonServer.defaults()
server.use(express.static('dist/build'))

const itemsForDeletion = {}

server.use((req, res, next) => {
  if (req.method === 'DELETE') {
    const id = last(compact(req.path.split('/')))
    const issue = router.db.get('issues').value().filter(issue => issue.id === id)[0]
    itemsForDeletion[id] = issue
  }
  next()
})

server.use(middlewares)

router.render = function (req, res) {
  if (req.method === 'DELETE' && isEmpty(res.locals.data)) {
    // console.log(res)
    const id = last(compact(req.path.split('/')))
    const issue = itemsForDeletion[id]
    io.sockets.emit('data', {
      action: deletedItem({
        issue
      })
    })
    delete itemsForDeletion[id]
  }
  if (req.method === 'POST') {
    const issue = res.locals.data
    io.sockets.emit('data', {
      action: pushData({
        data: [issue]
      })
    })
  }
  res.json(res.locals.data)
}

server.use('/db/', router)

// const httpServer = http.createServer((server))

server.listen(3000, function () {
  console.log('JSON Server is running')
})
//
// var app = express()
//   , http = require('http')
//   , server = http.createServer(app)
//   , io = require('socket.io').listen(server);




export function startServer () {
  io.on('connection', (socket) => {
    // fetchMackaroo returns data from the api
    // fetch the result and then emit the data
    console.log('ANNOUCING: WE HAVE A CONNECTION')

    fetchData()
      // .then((result) => result.val())
      // .then(transformJSONtoCSV)
      .then(transformFirebaseEntryToCSV)
      .then((data) => socket.emit('data', {
        action: initialFetch({
          data,
          payingCustomersData: generatePayingCustomerData()
        })
      }))
      .then(startServerPush.bind(null, socket))
  })
}
