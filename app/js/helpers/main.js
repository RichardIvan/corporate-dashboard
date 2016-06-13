import GraphContainer from '../containers/Root/Main/Graph'
import DataContainer from '../containers/Root/Main/Data'
import GeoContainer from '../containers/Root/Main/Geospacial'

export function retrieveComponent(route) {
  switch (route) {
  case 'graph':
    return GraphContainer
  case 'data':
    return DataContainer
  default:
    return GeoContainer
  }
}
