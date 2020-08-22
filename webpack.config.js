const babelpolyfill = require("@babel/polyfill")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: ['@babel/polyfill', './index.js'],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.min.js'
    },
    devServer: {
        contentBase: './',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '管理输出',
            minify: false, //plugin会自动压缩文件，改成false即可取消
            template: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            //打包css
            {
                test: /\.css$/,
                use: ['style-loader',
                    'css-loader'
                ]
            },
            //css中图片引用
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            //ES6转换
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            //打包单文件组件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    //不加载的第三方包
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
    }

}