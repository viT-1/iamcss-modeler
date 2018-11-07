const
    resolve =
        require( 'path' ).resolve,
    CleanWebpackPlugin =
        require( 'clean-webpack-plugin' ),
    HtmlWebpackPlugin =
        require( 'html-webpack-plugin' ),
    MiniCssExtractPlugin =
        require( 'mini-css-extract-plugin' ),
    VueLoaderPlugin =
        require( 'vue-loader/lib/plugin' ),
    nodeExternals =
        require( 'webpack-node-externals' );

const
    publicPath = './dist',
    srcPath = './src';

const baseAlias = {
    '~': resolve( __dirname )
    , '@': resolve( __dirname, 'src' )
};

const webpackConfig = {
    entry: {
        index: resolve( srcPath, 'index.js' )
        , vendor: resolve( srcPath, 'vendor.css' )
    }
    , output: {
        path: resolve( publicPath ),
        filename: '[name].bundled.js',
        // filename: '[name].[hash].bundled.js',
        publicPath: '/'
    }
    , module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            }
            , {
                test: /\.bpmn$/,
                use: 'raw-loader'
            }
            , {
                test: /\.(jpe?g|gif|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
                // loader: 'url-loader?limit=-1'
            }
            //Собирает все css которые завязаны через entry
            , {
                test: /\.css$/,
                // use: [
                //     MiniCssExtractPlugin.loader, 'css-loader',
                // ]

                // Так с версии 1.0.0 minimize не работает!
                use: [
                    MiniCssExtractPlugin.loader
                    , {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    }
    , plugins: [
        new VueLoaderPlugin()
        , new CleanWebpackPlugin( publicPath, {} )
        , new HtmlWebpackPlugin({
            template: resolve( srcPath, 'index.html' ),
            // hrefCss: '[name].[hash].bundled.css'
            hrefAppJs: 'index.bundled.js',
            hrefAppCss: 'index.bundled.css',
            hrefVendorCss: 'vendor.bundled.css'
        })
        , new MiniCssExtractPlugin({
            // filename: '[name].[hash].bundled.css'
            filename: '[name].bundled.css'
        })
    ]
    , mode: 'development'
    , devtool: 'source-map'
    , resolve: {
        alias: {
            ...baseAlias
            , vue: 'vue/dist/vue.js'
        }
    }
    , target: 'web'
    , performance: {
        maxEntrypointSize: 1024000
        , maxAssetSize: 1024000
    }
};

// Вариант со второй сборкой заменил на copy-webpack-plugin
const webpackNodeJsConfig = {
    entry: {
        'express-bpmn-service': resolve( srcPath, 'nodejs', 'express-bpmn-service', 'express-bpmn-service.js' )
    }
    , output: {
        path: resolve( publicPath ),
        filename: 'express-bpmn-service.bundled.js',
        publicPath: '/'
    }
    , mode: 'development'
    , target: 'node'
    , externals: [nodeExternals()]
    , resolve: {
        alias: baseAlias
    }
};

module.exports = [
    webpackConfig
    , webpackNodeJsConfig
];
