/* @flow */
'use strict'

import m from 'mithril'

// import NYCgeoJSON from '../../data/geojson/nyc.geojson'
import {
  getActiveLocation
} from '../selectors/location-list'

import {
  setActiveLocation
} from '../actions'

import mapStyles from '../helpers/map/map-styles'

const env = process.env.NODE_ENV

let mapsapi

if (env !== 'test') {
  mapsapi = require('google-maps-api')('AIzaSyC-XFgCKIzAFe_e0MjKKlKvKor4k_qWCdY')
}

// const geoJSON = require('../../data/geojson/nyc.geojson')
import geoJSON from '../../data/geojson/nyc.json'
import markerInfo from '../../data/geojson/markers.json'

// const GoogleMapsLoader = require('google-maps')
// GoogleMapsLoader.KEY = 'AIzaSyC-XFgCKIzAFe_e0MjKKlKvKor4k_qWCdY'

import styles from '../components/Map/map-styles.scss'

const MapContainer = {
  oninit (vnode) {
    vnode.state.appState = vnode.attrs.store.getState()
    vnode.state.google = mapsapi()
  },
  onbeforeupdate (vnode) {
    const route = vnode.attrs.route
    console.log(route)
    if (route !== 'geo') {
      const dom = vnode.dom
      console.log(dom)
      vnode.state.infowindow = null
      vnode.state.map = null
      vnode.state.google = null
    }

    const infowindow = vnode.state.infowindow

    console.log(infowindow)

    if (!infowindow) return false

    vnode.state.appState = vnode.attrs.store.getState()
    const state = vnode.state.appState
    const activeLocation = getActiveLocation(state)
    if (activeLocation) {
      vnode.state.google.then((google) => {
        const currentContent = infowindow.getContent()
        const newContent = activeLocation.get('content')
        if (currentContent === newContent) return false
        infowindow.setContent(newContent)
        const position = new google.LatLng(activeLocation.getIn(['position', 'lat']), activeLocation.getIn(['position', 'lng']))
        infowindow.setPosition(position)
        infowindow.open(vnode.state.map)
      })
    } else {
      infowindow.close(vnode.state.map)
    }
  },
  oncreate (vnode) {
    const el = vnode.dom.children[0]
    // el.style.width = '100%'
    // el.style.height = '100%'
    // el.style.position = 'absolute'
    //
    vnode.state.google.then(function (google) {
      vnode.state.infowindow = new google.InfoWindow({
        content: '<p>HELLO WORLD</p>'
      })
      google.event.addListener(vnode.state.infowindow, 'closeclick', () => {
        vnode.attrs.store.dispatch(setActiveLocation(false))
      })

      const options = {
        zoom: 11,
        center: new google.LatLng(40.799994, -73.946843),
        mapTypeId: google.MapTypeId.ROADMAP,
        minZoom: 11
      }
      vnode.state.map = new google.Map(el, options)
      const map = vnode.state.map
      map.setOptions({ styles: mapStyles })
      map.data.addGeoJson(geoJSON)
      // map.data.loadGeoJson('./dist/build/data/geojson/mnyc.json')
      map.data.setStyle({
        fillColor: '#7C6C9B',
        fillOpacity: 0.8,
        strokeWeight: 1
      })

      var allowedBounds = new google.LatLngBounds(
        new google.LatLng(40.73876083063101, -74.05464634472656),
        new google.LatLng(40.81675502371589, -73.85826572949219)
      )
      var lastValidCenter = map.getCenter()

      google.event.addListener(map, 'center_changed', function () {
        if (allowedBounds.contains(map.getCenter())) {
          lastValidCenter = map.getCenter()
          return
        }
        map.panTo(lastValidCenter)
      })

      map.data.addListener('mouseover', (e) => {
        map.data.overrideStyle(e.feature, {fillColor: '#FFFFFF'})

        const name = e.feature.H.name

        // const info = markerInfo[name]
        vnode.attrs.store.dispatch(setActiveLocation(name))
        // const position = new google.LatLng(info.center.lat, info.center.lng)
        // // const content = getInfoWindowContent(state)
        // infowindow.setPosition(position)
        // infowindow.open(map)
      })

      map.data.addListener('*', (e) => {
        console.log(e)
        map.data.overrideStyle(e.feature, {fillColor: '#FFFFFF'})

        const name = e.feature.H.name

        // const info = markerInfo[name]
        vnode.attrs.store.dispatch(setActiveLocation(name))
        // const position = new google.LatLng(info.center.lat, info.center.lng)
        // // const content = getInfoWindowContent(state)
        // infowindow.setPosition(position)
        // infowindow.open(map)
      })

      // 7C6C9B

      map.data.addListener('mouseout', (e) => {
        map.data.overrideStyle(e.feature, {fillColor: '#7C6C9B'})
      // infowindow.close()
      })

    // forEach(markerInfo, (info) => {
    //   // console.log(google.Marker)
    //   // new google.maps.LatLng(-33.91721, 151.22630)
    //   // const position = new google.LatLng(info.center.x, info.center.y)
    //   const position = new google.LatLng(info.center.lat, info.center.lng)
    //   // console.log(position.lat())
    //   // console.log(position.lng())
    //   markers[info.name] = new google.Marker({
    //     position,
    //     map,
    //     title: `${info.name}`
    //   })
    // })

    // console.log(map)
    // use the google.maps object as you please
    })

  // GoogleMapsLoader.onLoad(function (google) {
  //   console.log('I just loaded google maps api')
  //   const options = {
  //     zoom: 6,
  //     center: new google.maps.LatLng(40.104969, -5.0149713),
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }
  //   const map = new google.maps.Map(el, options)
  //   console.log(map)
  // })
  //
  // GoogleMapsLoader.load(function (google) {
  //
  //   // map.data.loadGeoJson('data/geojson/nyc.geojson')
  // })
  },
  view(vnode) {
    return m('#map', m(''))
  }
}

export default MapContainer
