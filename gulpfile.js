const gulp = require('gulp')
// const concat = require('gulp-concat')
// const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const gutil = require('gulp-util')
const shell = require('gulp-shell')
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const jscpd = require('gulp-jscpd')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const watch = require('gulp-watch')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const stream = require('webpack-stream')

const webpackConfig = require('./webpack.config.prod.js')
const webpackDevConfig = require('./webpack.config.dev.js')

const path = {
  HTML: 'app/index.html',
  ALL: ['app/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
  TESTS: './tests/**/*.js'
}

gulp.task('jscpd', () => gulp.src('app/*')
  .pipe(jscpd({
    languages: ['javascript, css'],
    verbose: true
  }))
)

gulp.task('clean', () => gulp.src(path.DEST_BUILD,
  {
    read: false
  }
).pipe(clean()))

gulp.task('webpack', [], () =>
// gulp looks for all source files under specified path
gulp.src(path.ALL)
  // creates a source map which would be very helpful for debugging
  // by maintaining the actual source code structure
  .pipe(sourcemaps.init())
  // blend in the webpack config into the source files
  .pipe(stream(webpackConfig))
  // minifies the code for better compression
  // .pipe(ignore.exclude([ "**/*.map" ]))
  // .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.DEST_BUILD))
)

// function can use callback
gulp.task('webpack-dev-server', () => {
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/',
    // publicPath: `/ + ${webpackDevConfig.output.publicPath}`,
    inline: true,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html')
  })
})

gulp.task('test', () => gulp.src('', { read: false })
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(shell(['npm run local-test'])))

gulp.task('test_watch', () => gulp.src('', { read: false })
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(shell(['npm run local-test:watch']))
  .pipe(shell(['npm run cover'])))

gulp.task('watch_tests', () => {
  return watch(path.TESTS, ['test'])
})

gulp.task('watch', () => {
  watch(path.ALL.concat(path.TESTS), () => runSequence(['test']))
})

gulp.task('cover', () => gulp.src('', { read: false })
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(shell(['npm run cover'])))

gulp.task('build', () => {
  runSequence(['clean', 'test', 'jscpd'], 'webpack')
})

gulp.task('socket', () => gulp.src('', { read: false })
  .pipe(shell(['npm run server']))
)

gulp.task('db', () => gulp.src('', { read: false })
  .pipe(shell(['npm run db']))
)

gulp.task('start', () => {
  runSequence(['socket'])
})

gulp.task('default', ['socket', 'webpack-dev-server'])
