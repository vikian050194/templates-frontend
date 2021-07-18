const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildFolderName = "public";

module.exports = {
    mode: "development",
    entry: ["./src/js/index.js", "./src/css/index.css"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                "eslint-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, buildFolderName),
        publicPath: "/"
    },
    plugins: [
        new webpack.ProvidePlugin({
            "Cookies": "js-cookie"
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/index.html" },
                { from: "src/favicon.svg" }
            ]
        })
    ],
    devServer: {
        index: path.resolve(__dirname, buildFolderName, "index.html"),
        contentBase: path.resolve(__dirname, buildFolderName),
        publicPath: "/",
        port: 8080,
        watchContentBase: false,
        open: false,
        inline: true,
        proxy: {
            "/api": {
                target: "http://localhost:8081",
                pathRewrite: { "^/api": "" }
            }
        }
    }
};
