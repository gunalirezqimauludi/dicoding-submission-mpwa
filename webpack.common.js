const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const workboxPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/app.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.css$/i,
        exclude: /styles/,
        use: ["to-string-loader", "css-loader"],
      },
      {
        test: /\.css$/i,
        include: /styles/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss)$/,
        include: [path.resolve(__dirname, "src/scss")],
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [require("autoprefixer")];
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        use: "url-loader?limit=1024&name=assets/fonts/[name].[ext]",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=assets/images/[name].[ext]",
          "image-webpack-loader?bypassOnDebug",
        ],
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve("src/"),
      scss: path.resolve("src/scss"),
      component: path.resolve("src/script/component/"),
      data: path.resolve("src/script/data/"),
      helper: path.resolve("src/script/helper/"),
      utils: path.resolve("src/script/utils/"),
      view: path.resolve("src/script/view"),
    },
  },
  target: "web",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new workboxPlugin.InjectManifest({
      swSrc: "./src/service-worker.js",
      swDest: "service-worker.js",
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "ESPN Live Soccer Scores",
      short_name: "ESPN",
      description: "Get Latest Soccer Match Score updates only on ESPN",
      theme_color: "#ee1c25",
      background_color: "#ee1c25",
      display: "standalone",
      inject: true,
      fingerprints: false,
      ios: true,
      start_url: "/index.html",
      icons: [{
        src: path.resolve("src/assets/images/icon.png"),
        destination: path.join("assets", "images", "icons"),
        sizes: [96, 128, 192, 256, 384, 512],
        ios: true,
      }],
      gcm_sender_id: "408843223007"
    }),
    new HtmlWebpackPlugin({
      favicon: "./src/assets/images/icon.png",
      template: "./src/index.html",
      filename: "index.html",
      meta: {
        author: "Gunali Rezqi Mauludi",
        description: "live soccer scores from across the world",
      },
      minify: "production",
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
          from: "src/assets/images/logo",
          to: "assets/images/logo",
        },
        {
          from: "src/assets/images/leagues",
          to: "assets/images/leagues",
        },
        {
          from: "src/assets/images/illustration",
          to: "assets/images/illustration",
        },
      ],
    }),
  ],
};