/* @flow */
'use strict'

import fetch from 'node-fetch'
import {
  sampleSize
} from 'lodash'

const data = fetch('http://localhost:8080/issues').then(res => res.json())

export function fetchData () {
  return data.then(issues => sampleSize(issues, 111))
}

export function fetchSingleItem () {
  return data.then((issues) => sampleSize(issues))
}
