'use strict'

import { newIssue } from '../actions'
import {
  fetchSingleItem,
  fillIDs,
  fillLocation,
  fillOpeningTimestamp,
  fillClosingTimestamp,
  saveToFirebase,
  fetchSingleItemFromFirebase,
} from '../helpers'

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
  , 1500)
  return true
}
