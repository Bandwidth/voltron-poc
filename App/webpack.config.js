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
    port: 3004,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new ModuleFederationPlugin({
      name: "app",
      filename: "remoteEntry.js",
      remotes: {
        homepage: "homepage@http://localhost:3006/remoteEntry.js",
        detailsPage: "detailsPage@http://localhost:3008/remoteEntry.js",
      },
      exposes: {
        "./WorkoutData": "./src/workoutObservable.ts",
      },
      shared: ["react", "react-dom"],
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
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
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
