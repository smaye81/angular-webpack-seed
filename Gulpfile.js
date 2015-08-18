var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var assign = require('object-assign');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var appConfig = {
    WEBPACK_ENTRY : './app/app.js',
    BUNDLE_NAME : './app/bundle.js',
    JS_SRC_FILES : './app/modules/**/*.js'
};
var webpackConfig = {
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
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
};

function buildWebpack(config) {
    webpack(config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack bundle', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false
        }));
    });
}

gulp.task('webpack', function() {
    buildWebpack(webpackConfig);
});

gulp.task('webpack-watch', function() {
    var customConfig = assign({}, webpackConfig);
    customConfig.watch = true;
    customConfig.devtool = 'source-map';
    buildWebpack(customConfig);
});


gulp.task("wds", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        publicPath: "/" + webpackConfig.output.path,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
            if(err) throw new gutil.PluginError("webpack-dev-server", err);
            // Server listening
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

            // keep the server alive or continue?
            // callback();
        });
});

gulp.task('default', ['webpack-watch', 'wds']);
