const path = require('path')
const webpack = require('webpack')

module.exports = [
  {
    name: 'package',
    entry: [
      'isomorphic-fetch',
      'es6-promise',
      './src/index.js'
    ],
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'syncano-client.js',
      library: 'SyncanoClient'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true, // eslint-disable-line camelcase
          keep_fnames: true  // eslint-disable-line camelcase
        },
        comments: false
      })
    ]
  }
]
