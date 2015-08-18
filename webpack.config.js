var appConfig = {
    WEBPACK_ENTRY : './app/app.js',
    BUNDLE_NAME : './app/bundle.js'
};

module.exports = {
    entry: appConfig.WEBPACK_ENTRY,
    output: {
        path: __dirname,
        filename: appConfig.BUNDLE_NAME
    },
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
