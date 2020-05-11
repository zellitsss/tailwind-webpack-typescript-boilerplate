const path = require('path');
const ComporessionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MozJpeg = require('imagemin-mozjpeg');

module.exports = {
    entry: './src/scripts/main.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'src/public'),
        compress: true,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|tff)$/,
                use: [
                    'url-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ImageminPlugin({
            pngquant: ({quality: [0.5, 0.5]}),
            plugins: [MozJpeg({quality: 50})],
        }),
        new ComporessionWebpackPlugin()
    ]
}