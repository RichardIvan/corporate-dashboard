'use strict'

import { pushData } from '../actions'

import { generateSingleCustomerData } from './paying-customers'

// import {
//   fetchSingleItemFromFirebase
// } from '../helpers/firebase'

import {
  fetchSingleItem
} from '../helpers/data'

export function startServerPush (socket) {
  console.log('STARTTED SERVER PUSH')
  setInterval(() => fetchSingleItem()
    .then((data) => socket.emit('data', {
      action: pushData({
        data,
        payingCustomersData: generateSingleCustomerData()
      })
    }))
  , 5000)
  return true
}
