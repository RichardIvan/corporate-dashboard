/* @flow */
'use strict'

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

import {
  fetchFirebase
} from './helpers/firebase'

import { initialFetch } from './actions'

export function startServer () {
  io.on('connection', (socket) => {
    // fetchMackaroo returns data from the api
    // fetch the result and then emit the data
    console.log('ANNOUCING: WE HAVE A CONNECTION')

    fetchFirebase()
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

    // fetchMockaroo()
    //   .then(fillIDs)
    //   .then(fillLocation)
    //   .then(fillOpeningTimestamp)
    //   .then(fillClosingTimestamp)
    //   // .then(transformJSONtoCSV)
    //   .then(transformNullValues)
    //   .then(saveToFirebase)
    //   // .then((data) => socket.emit('data', { action: initialFetch(data) }))
    //   // .then(startServerPush.bind(null, socket))
    //   .catch((err) => console.log(err))
  })
}
