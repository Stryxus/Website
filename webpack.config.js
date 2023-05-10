const path = require('path');
const process = require('process');

const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'assets.js'),
        output: {
            path: path.resolve(path.resolve(), 'Client', 'wwwroot'),
            publicPath: '',
            filename: '[name].min.js',
            globalObject: 'this',
            clean: true,
            asyncChunks: true,
            environment: {
                arrowFunction: true,
                bigIntLiteral: true,
                const: true,
                destructuring: true,
                dynamicImport: true,
                forOf: true,
                module: true,
                optionalChaining: true,
                templateLiteral: true,
            },
            assetModuleFilename: (pathData) => {
                const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
                return `${filepath.includes('wwwroot-dev/') ? filepath.slice(12) : filepath}/[name][ext]`;
            },
        },
        watch: argv.mode === 'development',
        watchOptions: {
            ignored: [ '**/Stryxus/Client/wwwroot/**', '**/node_modules' ],
        },
        module: {
            rules: [
                {
                    test: /\.sass$/i,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { sourceMap: argv.mode === 'development' } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: function ()
                                    {
                                        return [
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }
                        },
                        { loader: 'sass-loader', options: { sourceMap: argv.mode === 'development' } },
                    ],
                },
                {
                    test: /\.ts$/i,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(json|mp4|aac)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.woff2?$/,
                    type: 'asset/resource',
                    generator: {
                        filename: './fonts/[name][ext]',
                    },
                },
                {
                    test: /\.svg/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.png$/i,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8192
                        }
                    }
                },
            ],
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'index.html'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                ],
            }),
            {
                apply: (compiler) => {
                    if (argv.mode === 'production') {
                        compiler.hooks.done.tap('DonePlugin', (stats) => {
                            setTimeout(() => {
                                process.exit(0)
                            })
                        });
                    }
                }
            }
        ],
        optimization: {
            splitChunks: {
                maxSize: 100000,
            },
            minimize: true,
            minimizer: [
                '...',
                new TerserPlugin({
                    parallel: true,
                }),
                new ImageMinimizerPlugin({
                    generator: [
                        {
                            type: 'asset',
                            implementation: ImageMinimizerPlugin.squooshGenerate,
                            options: {
                                encodeOptions: {
                                    avif: {
                                        cqLevel: 18,
                                        speed: process.env.NODE_ENV === 'production' ? 0 : 10,
                                        subsample: 3,
                                    },
                                },
                            },
                            filter: (source, sourcePath) => { return sourcePath.endsWith('png'); },
                        },
                        {
                            preset: 'avif',
                            implementation: ImageMinimizerPlugin.squooshGenerate,
                            options: {
                                encodeOptions: {
                                    avif: {
                                        cqLevel: 18,
                                        speed: process.env.NODE_ENV === 'production' ? 0 : 10,
                                        subsample: 3,
                                    },
                                },
                            },
                        },
                    ],
                }),
            ],
        },
        performance: {
            hints: argv.mode === 'production' ? "warning" : false
        },
        resolve: {
            extensions: ['.ts']
        },
    };
};
