'use strict'

import firebase from 'firebase'
import { projectID, clientEmail, privateKey } from '../../private/key'
import { reduce, sampleSize } from 'lodash'
// import 'firebase/database'

const config = {
  serviceAccount: {
    projectID,
    clientEmail,
    privateKey,
  },
  databaseURL: 'https://udacity-67253.firebaseio.com/',
}

firebase.initializeApp(config)
const db = firebase.database()

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

const data = db.ref('corporate-dashboard/data/issues').once('value').then(snap => snap.val())

export function fetchFirebase() {
  return data.then((issues) => sampleSize(issues, 111))
}

export function fetchSingleItemFromFirebase() {
  return data.then((issues) => sampleSize(issues))
}
