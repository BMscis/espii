
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
//const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname,'src'),
    entry: {
        profile: ['./app-profile/app.js','./app-profile/app.scss'],
        login: ['./app-login/gin.js','./app-login/gin.scss'],
        user: ['./app-signup/er.js','./app-signup/er.scss'],
        signup: ['./app-signup/up.js','./app-signup/Aup.js','./app-signup/up.scss'],
    },
    plugins: [
        //new ManifestPlugin(),
        //new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new SWPrecacheWebpackPlugin({
          cacheId: 'espii-club',
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: 'service-worker.js',
          minify: true,
          navigateFallback: PUBLIC_PATH + 'index.html',
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
          ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            title: 'login',
            filename: 'index.html',
            template: './app-login/login.html'
          }),
          new HtmlWebpackPlugin({
            title: 'home',
            filename: 'home.html',
            template: './app-profile/arc.html'
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
          }),
          new HtmlWebpackPlugin({
            title: 'artist',
            filename: 'artist.html',
            template: './app-signup/artist.html'
          }),
          new WebpackPwaManifest({
            name: 'espii club',
            short_name: 'espiis',
            description: 'cloud-monitioring platform',
            background_color: '#414141',
            crossorigin: 'use-credentials',
            options : [
              {
                orientation: "portrait",
                display: "standalone",
                start_url: "./index.html",
                inject: true,
                fingerprints: true,
              }
            ],
            icons : [
              {
              src: path.resolve('src/img/logo_icon.png'),
              sizes: [96, 128, 192, 256, 384, 512]
              },
            ]
          }),
          new WorkboxPlugin.GenerateSW({
            //these options encourage the ServiceWorker to get there fast
            //and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting:true,
          }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {loader: 'css-loader'},
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
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'file-loader',
            options: {
              includePaths: ['./src/img/'],
              
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
};
