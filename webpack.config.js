var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './src/window/index.js']
  },
  output: {
    path: './public/built',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built',
    libraryTarget: 'commonjs2'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'babel-preset-react', 'react'],
          plugins: [
            'syntax-object-rest-spread',
            'transform-object-rest-spread'
          ]
        }
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '']
  },
  target: 'electron-renderer',
  devtool: 'source-map'
};
