const path = require('path')
const webpack = require('webpack')

const Autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pkg = require('./package.json')

const HOST = process.env.HOST || '0.0.0.0' // `process.env.HOST` defaults to `localhost`
const PORT = process.env.PORT // Defaults to 8080

const NODE_MODULES = path.resolve(__dirname, 'node_modules')
const EXTERNALS = path.resolve(__dirname, 'externals')
const STORAGE = path.resolve(__dirname, '__storage__')
const EXCLUDE_DEFAULT = [NODE_MODULES, EXTERNALS, STORAGE]

const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'build/www')

const NODE_ENV = process.env.NODE_ENV
const MODE = NODE_ENV !== 'development' ? 'production' : 'development'
process.env.BABEL_ENV = MODE

const APP_NAME = JSON.stringify(pkg.name).replace(/['"]+/g, '')
const APP_VERSION = JSON.stringify(pkg.version)

const config = {
    mode: MODE,

    // By default, webpack will resolve only against .js and .json files
    // while importing without an extension.
    resolve: {
        extensions: ['.js', '.json', '.jsx'],

        // https://github.com/gatsbyjs/gatsby/issues/11934
        // https://github.com/gaearon/react-hot-loader/tree/7089062eac273832102c074a368d5af27e23e0b0#webpack-plugin
        // https://github.com/gaearon/react-hot-loader/issues/1188
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },

    // The base directory, an absolute path, for resolving entry points and loaders from configuration.
    // By default the current directory is used,
    // but it's recommended to pass a value in your configuration.
    // This makes your configuration independent from CWD (current working directory).
    // context: path.resolve(__dirname, '...')

    entry: [
        '@babel/polyfill',
        'whatwg-fetch',
        SRC,
    ],

    // output see bellow (dev/prod configurations)
    output: {
        path: DIST,

        // `publicPath` gives control over the resulting urls you see at index.html for instance.
        // If you are hosting your assets on a CDN, this would be the place to tweak.
        // Set its value to support deep path refreshes by the devServer.
        // devServer.historyApiFallback also must be set to `true`.
        publicPath: '/',
    },

    performance: {
        maxEntrypointSize: MODE === 'production' ? 1000000 : 5000000,
        maxAssetSize: MODE === 'production' ? 1000000 : 5000000,
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: (() => {
                    if (MODE === 'development') {
                        return [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => ([Autoprefixer]),
                                },
                            },
                            'less-loader',
                        ]
                    }

                    return [
                        // Webpack 5 is likely to come with a CSS minimizer built-in.
                        // For Webpack 4 you need to bring your own.
                        // This configuration DO NOT apply any CSS minimization algorithms!
                        // Using `chunkhash` for the extracted CSS would lead to problems
                        // as the code points to the CSS through JavaScript bringing it to the same entry.
                        // That means if the application code or CSS changed, it would invalidate both.
                        // Therefore, instead of chunkhash, you can use
                        // `contenthash` that is generated based on the extracted content.
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([Autoprefixer]),
                            },
                        },
                        'less-loader',
                    ]
                })(),
            },

            // `url-loader` uses `file-loader` implicitly when limit is set.
            // Both have to be installed for the setup to work.
            // [hash] is defined differently for file-loader than for the rest of webpack.
            // It's calculated based on file content.
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // 10kB
                        name: 'img/[name].[hash:4].[ext]',
                    },
                },
            },

            // Use a similar setup as for images and rely on both `file-loader`
            // `and url-loader` while using the limit option.
            {
                // Match woff2 in addition to patterns like .woff?v=1.1.1.
                test: /\.(ttf|eot|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50000, // 50kB
                        name: 'fonts/[name].[hash:4].[ext]',
                    },
                },
            },

            // Web workers allow you to push work outside of
            // main execution thread of JavaScript making them
            // convenient for lengthy computations and background work.
            {
                test: /\.worker\.js$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'worker-loader',
                    options: {
                        name: '[name].[hash:4].js',
                    },
                },
            },

            // Take the code and turns it into a format older browsers can understand.
            {
                test: /\.jsx?$/,
                include: SRC,
                exclude: EXCLUDE_DEFAULT,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins: [
        // Ignore node_modules so CPU usage with poll watching drops significantly.
        // If you wanted to output the resulting file to a specific directory,
        // you could do it by passing a path.
        // Example: filename: 'styles/[name].css'.
        new webpack.WatchIgnorePlugin(EXCLUDE_DEFAULT),

        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(APP_NAME),
            APP_VERSION: JSON.stringify(APP_VERSION),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV),
        }),

        new HtmlWebpackPlugin({
            filename: DIST + '/index.html',
            template: SRC + '/index.ejs',
        }),

        // That [name] placeholder uses the name of the entry where the CSS is referred.
        // TODO: 'styles/[name].[contenthash:4].css'
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:4].css',
        }),

        new CopyWebpackPlugin(
            [
                {
                    from: SRC + '/assets/img/favicon.png',
                    to: DIST,
                },
                {
                    from: SRC + '/assets/img',
                    to: DIST + '/assets/img',
                },
            ],
            {
                ignore: ['.DS_Store'],
            },
        ),
    ],
}

// Production mode only settings -----------------------------------------------
// Enable source-map for production and let webpack use the default for development.
if (MODE === 'production') {
    // Output
    config.output.chunkFilename = '[name].[chunkhash:4].js'
    config.output.filename = '[name].[chunkhash:4].js'

    // `source-map` is the slowest and highest quality option of them all,
    // but that's fine for a production build.
    config.devtool = 'source-map'

    config.optimization = {
        // Extract a vendor bundle from the `node_modules` directory.
        // `initial` - normal chunks that count towards initial loading time of the application.
        splitChunks: {
            chunks: 'initial',
        },

        // When webpack writes bundles, it maintains a manifest as well.
        // You can find it in the generated vendor bundle in this project.
        // The manifest describes what files webpack should load.
        // It's possible to extract it and start loading the files of the project faster
        // instead of having to wait for the vendor bundle to be loaded.
        // The name manifest is used by convention. You can use any other name, and it will still work.
        // Because this setup is using HtmlWebpackPlugin,
        // there is no need to worry about loading the manifest ourselves
        // as the plugin adds a reference to index.html.
        // Extracting the manifest to a file of its own:
        runtimeChunk: {
            name: 'manifest',
        },
    }
}

// Development mode only settings ----------------------------------------------
if (MODE === 'development') {
    // Output
    // config.output.chunkFilename = '[name].[hash:4].js'
    // config.output.filename = '[name].[hash:4].js'
    config.output.globalObject = 'this' // fixed this issue: https://github.com/webpack/webpack/issues/6642

    // Webpack will generate source maps automatically for you in development mode.
    // The inline source map is valuable during development due to better performance.
    config.devtool = 'source-map'

    // WDS
    config.devServer = {
        // Assuming you don't generate index.html dynamically and prefer to maintain it yourself in a specific directory, you need to point WDS to it.
        // `contentBase` accepts either a path (e.g., 'build') or an array of paths (e.g., ['build', 'images']).
        // The value defaults to the project root.
        // contentBase: './',

        // Parse host and port from env to allow customization.
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0'
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: HOST, // Defaults to `localhost`
        port: PORT, // Defaults to 8080

        // Enables HTML5 history API based routing
        historyApiFallback: true,

        // Bypassing host checking
        disableHostCheck: true,

        // Adds headers to all responses
        // headers: { 'Access-Control-Allow-Origin': '*' },

        // Open the page in browser
        // open: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // An overlay for capturing compilation related warnings and errors in the browser.
        // `overlay` does not capture runtime errors of the application.
        overlay: true,

        // Don't refresh if hot loading fails.
        // Good while implementing the client interface.
        hotOnly: true,

        // If you want to refresh on errors too, set
        // hot: true,

        watchOptions: {
            // Delay the rebuild after the first change
            aggregateTimeout: 300,

            // Poll using interval (in ms, accepts boolean too)
            poll: 1000,

            // What is the difference between watchOptions.ignored and webpack.WatchIgnorePlugin
            // issue: https://stackoverflow.com/questions/48361956/what-is-the-difference-between-watchoptions-ignored-and-webpack-watchignoreplugi
            ignored: EXCLUDE_DEFAULT,

            // The bundled files will be available in the browser under this path.
            // Imagine that the server is running under http://localhost:8080
            // and output.filename is set to bundle.js.
            // By default the publicPath is "/",
            // so your bundle is available as http://localhost:8080/bundle.js.
            // The publicPath can be changed so the bundle is put in a different directory.
            // Make sure publicPath always starts and ends with a forward slash.
            // It is also possible to use a full URL.This is necessary for Hot Module Replacement.
            // It is recommended that devServer.publicPath is the same as output.publicPath.
            // publicPath: '/',
        },

        // proxy: [
        //     {
        //         context: ['/api/**'],
        //         target: `http://${API}:API_PORT`,
        //         secure: false,
        //     },
        // ],
    }

    // Enable the plugin to let webpack communicate changes to WDS.
    // `--hot` sets this automatically!
    config.plugins.push(new webpack.HotModuleReplacementPlugin())

    // HMR notes:
    // ----------
    // The setup assumes you have enabled webpack.NamedModulesPlugin().
    // If you run webpack in development mode, it will be on by default.
    //
    // You should not enable HMR for your production configuration.
    // It likely works, but it makes your bundles more significant than they should be.
    //
    // If you are using Babel,
    // configure it so that it lets webpack control module generation as otherwise,
    // HMR logic won't work!
    // `"modules": false`
}

module.exports = config
