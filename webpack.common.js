
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
//const ManifestPlugin = require('webpack-manifest-plugin');
//const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname,'src'),
    entry: {
      scss:[
        "./app-platform/scss/plyr.scss",
        "./app-platform/scss/_BuildingBlocks.scss",
        "./app-platform/scss/_ButtonControl.scss",
        "./app-platform/scss/_DimentionBlocks.scss",
        "./app-platform/scss/_GridBlocks.scss",
        "./app-platform/scss/_ImageControl.scss",
        "./app-platform/scss/_PaddingBlocks.scss",
        "./app-platform/scss/_StyleBlocks.scss"
      ],
        platform: ['./app-platform/arc.js']
    },
    plugins: [
        //new ManifestPlugin(),
        //new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        /*new SWPrecacheWebpackPlugin({
          cacheId: 'espii-club',
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: 'service-worker.js',
          minify: true,
          navigateFallback: PUBLIC_PATH + 'index.html',
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
        }),*/
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
          ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.jsp',
            template: './app/index.html'
          }),
          new WebpackPwaManifest({
            name: 'espii club',
            short_name: 'espiis',
            description: 'cloud-monitioring platform',
            theme_color: '#AA6378',
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
        path: path.resolve("C:/Users/melvi/eclipse-workspace/x64/espii/WebContent"),
        publicPath: '',
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
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
};
