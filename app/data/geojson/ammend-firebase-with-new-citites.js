'use strict'

import firebase from 'firebase'
// import { projectID, clientEmail, privateKey } from '../../private/key'
import { map, sample } from 'lodash'
// import 'firebase/database'
import cities from './cities.json'

let db
let data

const env = process.env.NODE_ENV

if (env !== 'test') {
  const p = require('../../../server/private/key')
  const config = {
    serviceAccount: {
      projectID: p.projectID,
      clientEmail: p.clientEmail,
      privateKey: p.privateKey
    },
    databaseURL: 'https://udacity-67253.firebaseio.com/'
  }

  firebase.initializeApp(config)
  db = firebase.database()
  data = db.ref('corporate-dashboard/data/issues').once('value').then((snap) => snap.val())
}

data.then(issues => {
  map(issues, (issue) => {
    // console.log(issue)
    // console.log(sample(cities))
    issue.location = sample(cities)
    const key = issue.id
    db.ref('corporate-dashboard/newData/issues').child(key).set(issue)
  })

  // citiesWithNewLocations.forEach(item => console.log(item.location))
})

// export function saveToFirebase (d) {
//   const issues = reduce(d, (accumulator, issue) => {
//     const item = { ...accumulator, [issue.id]: { ...issue } }
//     return item
//   }, {})
//
//   Object.keys(issues)
//         .map((key) => db.ref(`corporate-dashboard/data/issues/${key}`)
//                         .set(issues[key]))
//   // data.forEach((item) => {
//   //   const key = item.id
//   //   db.ref('corporate-dashboard/data/issues').child(key).set(item)
//   // })
// }
//
// export function fetchFirebase() {
//   return data.then((issues) => sampleSize(issues, 1000))
// }
//
// export function fetchSingleItemFromFirebase() {
//   return data.then((issues) => sampleSize(issues))
// }
