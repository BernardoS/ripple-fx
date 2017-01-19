const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
const path = require('path')
const webpack = require('webpack')

const port = 3000

module.exports = {
  context: path.join(__dirname, 'test'),
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/dev-server',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.html$/, loader: 'file?name=templates/[name].[ext]!extract!html'},
      {test: /\.(scss|css)$/, exclude: /node_modules/, loader: 'style!css?modules&sourceMap&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!sass?outputStyle=expanded&sourceMap'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /.json$/, loader: 'json'},
      {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=fonts/[name].[ext]'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BellOnBundlerErrorPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    stats: { colors: true },
    hot: true,
    host: '0.0.0.0',
    port,
    historyApiFallback: true
  }
}
