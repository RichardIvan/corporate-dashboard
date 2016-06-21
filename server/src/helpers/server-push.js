'use strict'

import { newIssue } from '../actions'
import {
  fetchSingleItem,
  fillIDs,
  fillLocation,
  fillOpeningTimestamp,
  fillClosingTimestamp,
} from '../helpers'

export function startServerPush (socket) {
  console.log('STARTTED SERVER PUSH')
  setInterval(() => fetchSingleItem()
    .then((data) => [data])
    .then(fillIDs)
    .then(fillLocation)
    .then(fillOpeningTimestamp)
    .then(fillClosingTimestamp)
    .then((data) => socket.emit('data', { action: newIssue(data) }))
  , 10000)
  return true
}
