'use strict'

import { DASHBOARD, GEO, GRAPH, DATA } from './constants'

export function resolveHeading(route) {
  switch (route) {
  case 'geo':
    return GEO
  case 'graph':
    return GRAPH
  case 'data':
    return DATA
  default:
    return DASHBOARD
  }
}
