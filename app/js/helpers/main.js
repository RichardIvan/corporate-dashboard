import GraphContainer from '../containers/Graph'
import DataContainer from '../containers/Data'
import GeoContainer from '../containers/Geo'

export function retrieveContainer(route) {
  switch (route) {
  case 'graph':
    return GraphContainer
  case 'data':
    return DataContainer
  default:
    return GeoContainer
  }
}
