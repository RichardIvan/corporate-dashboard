'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const precss = require('precss')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'source-map',
  entry: {
    // s: './src/js/s.js',
    index: './app/js/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    // Template based on keys in entry above
    filename: './js/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: [
      './node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new ExtractTextPlugin('./css/main.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [{
      //   test: /\.css$/,
      //   loaders: ['style', 'css'],
      //   include: path.join(__dirname, 'app'),
      // },
      test: /\.(css|scss)$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!postcss-loader!sass'),
      include: path.join(__dirname, './')
    },
    // {
    //   test: /\.scss$/,
    //   loader: ExtractTextPlugin.extract('style-loader', `css-loader?modules
    //     &importLoaders=1
    //     &localIdentName=[name]__[local]___[hash:base64:5]
    //     &sourceMap!postcss-loader!sass`),
    //   include: path.join(__dirname, 'app'),
    // },
    {
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, './')
    },
    {
      test: /\.json$/, loader: 'json-loader',
      include: path.join(__dirname, './')
    },
    {
      test: /\.(png|jpg|ttf)$/, loader: 'url-loader?limit=8192'
    }],
    postcss () {
      return [precss, autoprefixer]
    }
  }
  //   sassLoader: {
  //     includePaths: [path.resolve(__dirname, './')]
  //   }
  // }
}
