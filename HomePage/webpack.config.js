const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    port: 3006,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "homepage",
      filename: "remoteEntry.js",
      remotes: {
        reactComponents: "reactComponents@http://localhost:3007/remoteEntry.js",
        quickBooking: "quickBooking@http://localhost:3005/remoteEntry.js",
        app: "app@http://localhost:3004/remoteEntry.js",
      },
      exposes: {
        "./HomeContent": "./src/components/HomeContent/HomeContent.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /.s[ac]ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /.(ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "async",
    },
  },
};
