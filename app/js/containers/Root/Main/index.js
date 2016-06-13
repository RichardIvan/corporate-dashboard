'use strict'

import m from 'mithril'
// import classNames from 'classnames'
// import RepoStatsComponent from '../components/RepoStats';
// import {getEntityById, isPending} from '../selectors';
// import {fetchRepo, showMessage} from '../actions';
// import styles from './style.scss'
import MainComponent from '../../../components/Main'
import { retrieveComponent } from '../../../helpers'

// import GeospacialContainer from './Geospacial.js'
// import DataContainer from './Data.js'
// import GraphContainer from './Graph.js'

// const components = {
//   geospacial: GeospacialContainer,
//   data: DataContainer,
//   graph: GraphContainer,
// }

// const route = 'geospacial'

const Main = {
  view(vnode) {
    return m(MainComponent, { container: retrieveComponent(vnode.attrs.route) })
  },
}

export default Main

// const FETCH_RATE = 90 * 1000;
//
// const RepoStats = {
//   controller(attrs) {
//     const {dispatch} = attrs.store;
//
//     let timeout = null;
//
//     function nextFetch() {
//       dispatch(fetchRepo(attrs.repo)).then(resp => {
//         if (resp.error) {
//           dispatch(showMessage({
//             body: 'Failed to fetch repo',
//             type: 'error',
//             duration: 10,
//           }));
//         }
//
//         timeout = setTimeout(nextFetch, FETCH_RATE);
//       });
//     }
//
//     nextFetch();
//
//     return {
//       onunload() {
//         if (!timeout) return;
//
//         clearTimeout(timeout);
//         timeout = null;
//       },
//     };
//   },
//
//   view(ctrl, {store, className, repo}) {
//     const state = store.getState();
//
//     return (
//       <RepoStatsComponent className={classNames(styles.repoStats, className)}
//         repo={getEntityById(state, 'repos', repo)}
//         pending={isPending(state, repo)}
//       />
//     );
//   },
// };
//
// export default RepoStats;