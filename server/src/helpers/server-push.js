'use strict'

import { newIssue } from '../actions'

// fetchSingleItem,
// fillIDs,
// fillLocation,
// fillOpeningTimestamp,
// fillClosingTimestamp,
// saveToFirebase,

import {
  fetchSingleItemFromFirebase,
} from '../helpers/firebase'

export function startServerPush (socket) {
  console.log('STARTTED SERVER PUSH')
  setInterval(() => fetchSingleItemFromFirebase()
    // .then((data) => [data])
    // .then(fillIDs)
    // .then(fillLocation)
    // .then(fillOpeningTimestamp)
    // .then(fillClosingTimestamp)
    // .then(saveToFirebase)
    .then((data) => socket.emit('data', { action: newIssue(data) }))
  , 5000)
  return true
}
