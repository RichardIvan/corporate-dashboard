/* @flow */
'use strict'

import Mockaroo from 'mockaroo'

const client = new Mockaroo.Client({
  // apiKey: '42a44a40',
  // apiKey: '260d2160',
  apiKey: '99a53dc0',
})


// client.generate({
//     count: 10,
//     schema: 'My Saved Schema'
// }).then(function(records) {
//     ...
// });

// console.log()

export function fetchMockaroo(): Promise {
  return client.generate({
    count: 1000,
    format: 'json',
    schema: 'Corporate Dashboard',
  })
  .catch((err) => err)
  // .then(function(records) {
  //     return records
  // })
}

export function fetchSingleItem(): Promise {
  return client.generate({
    count: 1000,
    format: 'json',
    schema: 'Corporate Dashboard',
  })
  .catch((err) => err)
}
