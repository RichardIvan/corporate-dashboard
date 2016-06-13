'use strict'

import { GEO, GRAPH, DATA, ISSUES, OPEN_ISSUES } from './constants'

export function resolveHeading(container, route) {
  switch (route) {
  case 'graph':
    return container === 'root' ? GRAPH : ISSUES
  case 'data':
    return container === 'root' ? DATA : ISSUES
  default:
    return container === 'root' ? GEO : OPEN_ISSUES
  }
}
