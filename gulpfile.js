const gulp = require('gulp')
// const concat = require('gulp-concat')
// const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const gutil = require('gulp-util')
const shell = require("gulp-shell")
const clean = require('gulp-clean')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const stream = require('webpack-stream')

const webpackConfig = require('./webpack.config.prod.js')
const webpackDevConfig = require('./webpack.config.dev.js')

const path = {
  HTML: 'src/index.html',
  ALL: ['src/**/*.jsx', 'src/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
}

gulp.task('clean', () => gulp.src(path.DEST_BUILD,
  {
    read: false,
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
      colors: true,
    },
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html')
  })
})

gulp.task('test', shell.task(['npm run cover'],
  {
    ignoreErrors: true,
  }
))

gulp.task('watch', () => {
  gulp.watch(path.ALL, ['clean', 'webpack', 'test'])
})

gulp.task('default', ['webpack-dev-server', 'watch'])
