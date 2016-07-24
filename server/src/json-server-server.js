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
  deletedItem
} from './actions'
// const http = require('http')

var server = jsonServer.create()

var router = jsonServer.router('./server/db.json')
var middlewares = jsonServer.defaults()
server.use(express.static('dist/build'))

// server.use((req, res, next) => {
//   // console.error(err.stack)
//   // console.log(req)
//   // console.log(res)
//   console.log('middleware bro')
//   // res.status(500).send('Something broke!');
//   next()
// })

server.use(middlewares)

router.render = function (req, res) {
  console.log(req.method)
  console.log(res.locals.data)
  if (req.method === 'DELETE' && isEmpty(res.locals.data)) {
    console.log('DELETED')
    const id = last(compact(req.path.split('/')))
    console.log(id)
    io.sockets.emit('data', {
      action: deletedItem({
        id
      })
    })
  }
  // res.jsonp({
  //  body: res.locals.data
  // })
  res.json(res.locals.data)
}

server.use('/db/', router)

// const httpServer = http.createServer((server))

server.listen(1337, function () {
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
