/* @flow */
'use strict'

import jsonfile from 'jsonfile'
import geojson from './nyc.json'

import { map, flatten, filter, first, last, min, max } from 'lodash'

const file = './markers.json'
const features = geojson.features

const getPoint = (coords) => {
  const flat = flatten(coords)
  // console.log(flat)
  const filtered = map(flat, (item) => filter(item, (i) => i))
  // const filtered = filter(flat, (o) => o)
  // console.log(filtered)
  // const together = chunk(filtered, 2)
  // console.log(together)
  const x = map(filtered, (item) => first(item))
  const y = map(filtered, (item) => last(item))
  //
  // // console.log(x)
  // // console.log(y)
  //
  const x1 = min(x)
  const y1 = min(y)
  const x2 = max(x)
  const y2 = max(y)
  //
  // // console.log(x1)
  // // console.log(y1)
  // // console.log(x2)
  // // console.log(y2)
  //
  const center = {}
  //
  center.lat = y1 + ((y2 - y1) / 2)
  center.lng = x1 + ((x2 - x1) / 2)

  //
  // console.log(center)
  return center

  // console.log(coords.length)
  // coords.forEach((value) => {
  //   const flat = flatten(value, 1)
  //   const filtered = filter(flat, (o) => o)
  //   // console.log(filtered.length)
  //   const together = chunk(filtered, 2)
  //   // console.log(together)
  //   const x = map(together, (item) => first(item))
  //   const y = map(together, (item) => last(item))
  //
  //   // console.log(x)
  //   // console.log(y)
  //
  //   const x1 = min(x)
  //   const y1 = min(y)
  //   const x2 = max(x)
  //   const y2 = max(y)
  //
  //   // console.log(x1)
  //   // console.log(y1)
  //   // console.log(x2)
  //   // console.log(y2)
  //
  //   const center = {}
  //
  //   center.x = x1 + ((x2 - x1) / 2)
  //   center.y = y1 + ((y2 - y1) / 2)
  //
  //   console.log(center)
  //   return center
  // // console.log(flatten(value, 3))
  // // console.log(value.length)
  // })
// console.log()
}
const citiesWithPoint = {}

map(features, (feature, index) => {
  // console.log(features.type)
  // getPoint(feature.geometry.coordinates)
  // console.log(getPoint(feature.geometry.coordinates[index]))
  const name = feature.properties.name
  citiesWithPoint[name] = {
    name: feature.properties.name,
    center: getPoint(feature.geometry.coordinates)
  }
  // return {
  //   name: feature.properties.name,
  //   center: getPoint(feature.geometry.coordinates)
  // }
})

// console.log(citiesWithPoint)
jsonfile.writeFile(file, citiesWithPoint, function (err) {
  console.error(err)
})
