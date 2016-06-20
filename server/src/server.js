/* @flow */
'use strict'

import Server from 'socket.io'
const io = new Server(3333)

import {
  fetchMockaroo,
  fillIDs,
  fillLocation,
  fillOpeningTimestamp,
  fillClosingTimestamp,
} from './helpers'

export function startServer () {
  io.on('connection', (socket) => {
    // fetchMackaroo returns data from the api
    // fetch the result and then emit the data
    console.log('ANNOUCING: WE HAVE A CONNECTION')

    fetchMockaroo()
      .then(fillIDs)
      .then(fillLocation)
      .then(fillOpeningTimestamp)
      .then(fillClosingTimestamp)
      .then((data) => socket.emit('data', { data }))
  })
}
