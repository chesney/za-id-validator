var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var minify = process.env.MINIFY || false;

var eslintLoader = {
  test: /\.js$/,
  loaders: ['eslint'],
  include: path.resolve('./source')
};

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true
});


module.exports = {
  devtool: 'sourcemap',

  entry: './source/index.js',

  output: {
    filename: minify ? 'index.min.js' : 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve('./build')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"'
      }
    })
  ].concat(minify ? [uglifyPlugin] : []),

  module: {
    preLoaders: env === 'development' ? [
      eslintLoader
    ] : [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve('./source'),
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  },

  stats: {
    colors: true
  },

  eslint: {
    configFile: './.eslintrc'
  }
};
