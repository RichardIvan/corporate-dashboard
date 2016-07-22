/* @flow */
'use strict'

import forEach from 'lodash/foreach'
import fetch from 'node-fetch'

import {
  fetchAllItemsInFirebase
} from './firebase'

export function saveToJSONServer () {
  fetchAllItemsInFirebase().then(data => {
    forEach(data, (issue, key) => {

      // const issue = i.id = key
      // console.log(i)
      // fetch('/posts').then(res => console.log(res))
      // fetch('http://localhost:8080/issues').then(res => res.json())
      //                                     .then(json => console.log(json))

      fetch('http://localhost:8080/issues/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(issue)
      }).then(res => console.log(res.ok))
    })
  })
}

saveToJSONServer()
