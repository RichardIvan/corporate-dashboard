[![Coverage Status](https://coveralls.io/repos/github/RichardIvan/corporate-dashboard/badge.svg?branch=master)](https://coveralls.io/github/RichardIvan/corporate-dashboard?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7f21023e29374ae6a2ba214ac9d76035)](https://www.codacy.com/app/richardivan-com/corporate-dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=RichardIvan/corporate-dashboard&amp;utm_campaign=Badge_Grade)


# corporate-dashboard
Udacity Corporate Dashboard Project - Focusing on modularity and component based application design. This application is accepting a CSV file on load and continuously updates data without full page refresh by pushing new JSON data through Socket IO connection, merging this data to Redux store and dom diffing this new state with Mithril's auto-redrawing system.

## Features & Technologies

* [Mithril 1.0](https://github.com/lhorie/mithril.js/tree/rewrite)
* [Webpack build system](https://github.com/webpack/webpack)
* [Redux](https://github.com/reactjs/redux) + [Immutable JS](https://facebook.github.io/immutable-js/)
* [Circle CI](circleci.com) + Code Coverage via [Coveralls](coveralls.io)
* Live reloading.
* ES6 via [Babel](https://babeljs.io/).
* [Standard](https://github.com/feross/standard) linting via ESLint.
* [Socket io](http://socket.io/)
* [Firebase](https://firebase.google.com/)
* [Mocha](https://mochajs.org/) + [Expect](https://github.com/mjackson/expect)
* [Mithril Query](https://github.com/StephanHoyer/mithril-query/tree/rewrite)
* [Mithril Node Render](https://github.com/StephanHoyer/mithril-node-render/tree/rewrite)
* [Gulp](http://gulpjs.com/)
* [Flowtype](https://flowtype.org/) Typechecking


## Installation

Get started by installing npm; please follow this tutorial -> [http://blog.npmjs.org/post/85484771375/how-to-install-npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

* ```npm i```


## Running

* Run ```gulp start```

View demo in the browser at 'http://localhost:1337'

Thank you for checking out this project.


## License

Copyright (c) 2016 Richard Ivan.

Licensed under the MIT license.
