'use strict'

import { newIssue } from '../actions'

import { generateSingleCustomerData } from './paying-customers'

import {
  fetchSingleItemFromFirebase,
} from '../helpers/firebase'

export function startServerPush (socket) {
  console.log('STARTTED SERVER PUSH')
  setInterval(() => fetchSingleItemFromFirebase()
    .then((data) => socket.emit('data', {
      action: {
        data: newIssue(data),
        payingCustomersData: generateSingleCustomerData(),
      },
    }))
  , 5000)
  return true
}
