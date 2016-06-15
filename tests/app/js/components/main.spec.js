'use strict'

// import o from '../../../../ospec/ospec.js'
import mq from 'mithril-query'

import Main from '../../../../app/js/components/Main'

import GeospacialContainer from '../../../../app/js/containers/Root/Main/Geospacial'
import Data from '../../../../app/js/containers/Root/Main/Data'
import Graph from '../../../../app/js/containers/Root/Main/Graph'

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
