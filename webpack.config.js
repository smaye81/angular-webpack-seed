var WebpackNotifierPlugin = require('webpack-notifier');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var appConfig = {
    WEBPACK_ENTRY : ['./app/app.js'],
    BUNDLE_NAME : {
        APP : './app/bundle.js',
        VENDOR : './app/vendor.bundle.js'
    }
};

module.exports = {
    entry: {
        'app': appConfig.WEBPACK_ENTRY,
        'vendor': ["angular"]
    },
    output: {
        path: __dirname,
        filename: appConfig.BUNDLE_NAME.APP
    },
    plugins : [
        new WebpackNotifierPlugin(),
        new CommonsChunkPlugin("vendor", appConfig.BUNDLE_NAME.VENDOR)
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },
    eslint: {
        configFile: './.eslintrc'
    }
};
