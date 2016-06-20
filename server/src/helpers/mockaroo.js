/* @flow */
'use strict'

import Mockaroo from 'mockaroo'

var client = new Mockaroo.Client({
    apiKey: '260d2160' // see http://mockaroo.com/api/docs to get your api key
})


// client.generate({
//     count: 10,
//     schema: 'My Saved Schema'
// }).then(function(records) {
//     ...
// });

// console.log()

export function fetchMockaroo () {
  return client.generate({
          count: 50,
          header: true,
          format: 'json',
          schema: 'Corporate Dashboard'
        })
        .catch(err => err)
        // .then(function(records) {
        //     return records
        // })
}
