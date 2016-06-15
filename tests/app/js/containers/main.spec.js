'use strict'

// import o from '../../../../ospec/ospec.js'
import mq from 'mithril-query'

import Main from '../../../../app/js/containers/Root/Main'

import GeospacialContainer from '../../../../app/js/containers/Root/Main/Geospacial'
import DataContainer from '../../../../app/js/containers/Root/Main/Data'
import GraphContainer from '../../../../app/js/containers/Root/Main/Graph'

// o.spec('main container', () => {
//   o.spec('structure', () => {
//     o('displays #main-container', () => {
//       o(mq(Main).has('#main-container')).equals(true)
//     })
//
//     o('has div', () => {
//       o(mq(Main).has('div')).equals(true)
//     })
//     o('displays data view', () => {
//       o(mq(Main, { component: DataContainer, route: 'data' }).has('#data')).equals(true)
//     })
//     o('displays graph view', () => {
//       o(mq(Main, { component: GraphContainer, route: 'graph' }).has('#graph')).equals(true)
//     })
//     o('displays geospacial view', () => {
//       o(mq(Main, { component: GeospacialContainer, route: 'geo' }).has('#geo')).equals(true)
//     })
//     o('displays geospacial view with random route parameter', () => {
//       o(mq(Main, { component: GeospacialContainer, route: 'test' }).has('#geo')).equals(true)
//     })
//   })
//   // o.spec('behaviour', () => {
//   //   o('behaves', () => {
//   //     o(true).equals(true)
//   //   })
//   // })
//   o.spec('toolbar', () => {
//     o('geospacial should display number of issues', () => {
//       o(mq(Main, { component: GeospacialContainer, route: 'test' })
//         .contains('Number of open issues'))
//     })
//     o('data should display issues', () => {
//       o(mq(Main, { component: GeospacialContainer, route: 'data' })
//         .contains('Issues'))
//     })
//     o('graph should display issues', () => {
//       o(mq(Main, { component: GeospacialContainer, route: 'graph' })
//         .contains('Issues'))
//     })
//   })
// })
