/* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { retrieveContainer } from '../../../../app/js/helpers'

import GraphContainer from '../../../../app/js/containers/Graph'
import DataContainer from '../../../../app/js/containers/Data'
import GeoContainer from '../../../../app/js/containers/Geo'

describe('Main Helper', () => {
  describe('#retrieveContainer()', () => {
    it('should retrive Graph container with graph route passed in', () => {
      expect(retrieveContainer('graph')).toEqual(GraphContainer)
      expect(retrieveContainer('nogeo')).toNotEqual(GraphContainer)
    })

    it('should retrive Data container with graph route passed in', () => {
      expect(retrieveContainer('data')).toEqual(DataContainer)
      expect(retrieveContainer('nogeo')).toNotEqual(DataContainer)
    })

    it('should retrive Geo container with graph route passed in', () => {
      expect(retrieveContainer('geo')).toEqual(GeoContainer)
      expect(retrieveContainer('nogeo')).toEqual(GeoContainer)
    })
  })
})
