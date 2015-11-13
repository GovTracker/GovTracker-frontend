require('babel/polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var strip = require('strip-loader');

var relativeAssetsPath = './static/dist/frontend/js';
var assetsPath = path.join(__dirname, relativeAssetsPath);

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '.'),
  entry: [
    'babel-core/external-helpers',
    'babel-core/polyfill',
    './src/client/index.js'
  ],
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/static/frontend/js/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: strip.loader('debug')},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { optional: ['runtime'], stage: 0, externalHelpers: true } },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new CleanPlugin([relativeAssetsPath]),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
