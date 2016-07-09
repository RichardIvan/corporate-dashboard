'use strict'

import isEmpty from 'lodash/isEmpty'

import firebase from 'firebase'
// import { projectID, clientEmail, privateKey } from '../../private/key'
import { reduce, sampleSize } from 'lodash'
// import 'firebase/database'

let db
let data

if (process.env.NODE_ENV !== 'test') {
  const p = require('../../private/key')
  const config = {
    serviceAccount: {
      projectID: p.projectID,
      clientEmail: p.clientEmail,
      privateKey: p.privateKey,
    },
    databaseURL: 'https://udacity-67253.firebaseio.com/',
  }

  firebase.initializeApp(config)
  db = firebase.database()
  data = db.ref('corporate-dashboard/data/issues').once('value').then(snap => snap.val())
}

export function saveToFirebase (data) {
  const issues = reduce(data, (accumulator, issue) => {
    const item = { ...accumulator, [issue.id]: { ...issue } }
    return item
  }, {})

  Object.keys(issues).map(key => {
    db.ref('corporate-dashboard/data/issues/' + key).set(issues[key])
  })
  // data.forEach((item) => {
  //   const key = item.id
  //   db.ref('corporate-dashboard/data/issues').child(key).set(item)
  // })
}

export function fetchFirebase() {
  return data.then((issues) => sampleSize(issues, 2))
}

export function fetchSingleItemFromFirebase() {
  return data.then((issues) => sampleSize(issues))
}
