const path = require("path");

const INLINE_IMAGE_LIMIT = 8192;

const POLYFILLS = ["core-js/shim", "isomorphic-fetch", "wicg-inert"];

module.exports = {
  options: {
    stylus: {
      preferPathResolver: "webpack",
      "include css": true,
      "resolve url": true
    }
  },
  webpack: {
    entry: {
      polyfills: POLYFILLS,
      jobs: "./src/jobs/index.js",
      register: "./src/register/index.js",
      content: "./src/content/index.js"
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          use: "json-loader"
        },
        {
          test: /\.ico$/i,
          loader: "file-loader?name=[name].[ext]"
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: `url-loader?limit=${INLINE_IMAGE_LIMIT}&name=images/[name].[ext]`
        },
        {
          test: /\.(eot|ttf|woff2|woff)$/i,
          use: `url-loader?limit=${INLINE_IMAGE_LIMIT}&name=fonts/[name].[ext]`
        }
      ]
    },
    externals: {
      moment: "moment",
      jquery: "jQuery"
    },
    resolve: {
      extensions: [".js", ".json"],
      alias: {
        register: path.resolve(__dirname, "src/register"),
        common: path.resolve(__dirname, "src/common"),
        content: path.resolve(__dirname, "src/content"),
        jobs: path.resolve(__dirname, "src/jobs")
      }
    }
  }
};
