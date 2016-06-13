'use strict'

import { GEO, GRAPH, DATA } from './constants'

export function resolveHeading(route) {
  switch (route) {
  case 'graph':
    return GRAPH
  case 'data':
    return DATA
  default:
    return GEO
  }
}
