'use strict'

// import o from '../../../../ospec/ospec.js'
import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import MainComponent from '../../../../app/js/components/Main'

import GeospacialContainer from '../../../../app/js/containers/Geo'
import DataContainer from '../../../../app/js/containers/Data'
import GraphContainer from '../../../../app/js/containers/Graph'

// describe('main component', () => {
//   it('should display geospacial view', () => {
//     expect(mq(MainComponent, { container: GeospacialContainer }).has('#geo')).toBe(true)
//   })
//
//   it('should display data view', () => {
//     expect(mq(MainComponent, { container: DataContainer }).has('#data')).toBe(true)
//   })
//
//   it('should display graph view', () => {
//     expect(mq(MainComponent, { container: GraphContainer }).has('#graph')).toBe(true)
//   })
//
//   it('should have #main-container', () => {
//     expect(mq(MainComponent).has('#main-container')).toBe(true)
//   })
// })

// o.spec('main component', () => {
//   o.spec('structure', () => {
//     o('displays geospacial view', () => {
//       o(mq(Main, { container: GeospacialContainer }).has('#geo')).equals(true)
//     })
//     o('displays data view', () => {
//       o(mq(Main, { container: Data }).has('#data')).equals(true)
//     })
//     o('displays graph view', () => {
//       o(mq(Main, { container: Graph }).has('#graph')).equals(true)
//     })
//     // o.only('has #main-container', () => {
//     //   o(true).equals(true)
//     // })
//     o('has #main-container', () => {
//       o(mq(Main).has('#main-container')).equals(true)
//     })
//   })
//   // o.spec('behaviour', () => {
//   //   o('behaves', () => {
//   //     o(true).equals(true)
//   //   })
//   // })
// })
