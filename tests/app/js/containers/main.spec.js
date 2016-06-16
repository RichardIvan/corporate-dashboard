'use strict'

// import o from '../../../../ospec/ospec.js'
import { describe, it } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import Main from '../../../../app/js/containers/Main'

import GeospacialContainer from '../../../../app/js/containers/Geo'
import DataContainer from '../../../../app/js/containers/Data'
import GraphContainer from '../../../../app/js/containers/Graph'

describe('Main container', () => {
  it('displays #main-container', () => {
    expect(mq(Main).has('#main-container')).toBe(true)
  })

  it('has div', () => {
    expect(mq(Main).has('div')).toBe(true)
  })

  it('should display data container', () => {
    expect(mq(Main, { container: DataContainer, route: 'data' }).has('#data')).toBe(true)
  })

  it('should display graph container', () => {
    expect(mq(Main, { container: GraphContainer, route: 'graph' }).has('#graph')).toBe(true)
  })

  it('should display geospacial container', () => {
    expect(mq(Main, { container: GeospacialContainer, route: 'geo' }).has('#geo')).toBe(true)
  })

  it('should display geospacial container on random route', () => {
    expect(mq(Main, { container: GeospacialContainer, route: 'test' }).has('#geo')).toBe(true)
  })
})

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
