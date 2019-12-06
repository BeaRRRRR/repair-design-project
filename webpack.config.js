const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  target: "web",
  mode: "production",

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: [/node_modules/, require.resolve('./index.html')],
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
          }
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      {from:'src/images',to:'images'},
      {from :'src/icons', to :'icons'}
    ]),
  ]
};
