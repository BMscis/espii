
const autoprefixer = require('autoprefixer');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

function tryResolve_(url, sourceFilename) {
  // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
  // when the importer throws
  try {
    return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
  } catch (e) {
    return '';
  }
}

function tryResolveScss(url, sourceFilename) {
  // Support omission of .scss and leading _
  const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`;
  return tryResolve_(normalizedUrl, sourceFilename) ||
    tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
      sourceFilename);
}

function materialImporter(url, prev) {
  if (url.startsWith('@material')) {
    const resolved = tryResolveScss(url, prev);
    return {file: resolved || url};
  }
  return {file: url};
}
//main app.js/css
module.exports = [
  {
  context: path.resolve(__dirname,'src'),
  entry: {
    profile: ['./app-profile/app.js','./app-profile/print.js','./app-profile/app.scss'],
    login: ['./app-login/gin.js','./app-login/gin.scss'],
    user: ['./app-signup/er.js','./app-signup/er.scss'],
    signup: ['./app-signup/up.js','./app-signup/up.scss'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname,'dist'),
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css'
            },
          },
          {loader: 'extract-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
                
              sassOptions: {
                includePaths: ['./node_modules'],
              }
            },
          }
        ],
      },
      {
        test: /\.js$/,
        includePaths: path.resolve(__dirname,'src'),
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        includePaths: path.resolve(__dirname,'src/img'),
        loader: 'file-loader',
        options: {
          includePaths: ['./src/img/'],
          name: 'espii_logo',
        },
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
  },
  plugins: [

    new HtmlWebpackPlugin({
      title: 'Profile',
      filename: 'index.html',
      template: './app-profile/arc.html'
    }),
    new HtmlWebpackPlugin({
      title: 'login',
      filename: 'login.html',
      template: './app-login/login.html'
    }),
    new HtmlWebpackPlugin({
      title: 'login-signup',
      filename: 'login-signup.html',
      template: './app-signup/login-signup.html'
    }),
    new HtmlWebpackPlugin({
      title: 'business-artist',
      filename: 'business-artist.html',
      template: './app-signup/business-artist.html'
    }),
    new HtmlWebpackPlugin({
      title: 'business',
      filename: 'business.html',
      template: './app-signup/business.html'
    })
  ],
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  },
];