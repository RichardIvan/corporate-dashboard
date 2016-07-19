/* @flow */
'use strict'

import jsonfile from 'jsonfile'

var file = './cities.json'

import json from './nyc.json'
import map from 'lodash/map'

// console.log(json.features)
const features = json.features

const cities = map(features, (feature) => {
  return feature.properties.name
})

jsonfile.writeFile(file, cities, function (err) {
  console.error(err)
})
