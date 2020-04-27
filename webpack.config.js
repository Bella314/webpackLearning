const path = require('path')
// 生成根目录下文html 并自动引入js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 每次npm run build 之前清除dist文件夹
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 拷贝不需要经过打包的静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    // 入口文件配置
    entry:'./src/index.js',
    // 出口文件配置项
    output:{
        // 输出的路径，webpack2起规定必须为绝对路径 __dirname代表当前目录下
        path:path.join(__dirname,'dist'),
        // 输出文件名字
        filename:'bundle.js'
    },
    mode: 'development' ,//默认为production（生产环境） 项目完成后打包使用会压缩文件   development（开发环境）下便于开发热加载，可根据不同的环境做不同的配置，区分打包，不会压缩文件
    module:{
        rules:[
            // 配置用来解析.css文件的loader（css-loader：解析css文件 和style-loader：将解析出来的结果放到html中生效）
            {
                // 用正则匹配当前访问的文件的后缀名是 .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|jpeg|png|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        // 指定打包后输出的文件名
                        outputPath:'images',
                        name:'[name]-[hash:4].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf)$/,
                use: ['url-loader']
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    // 下列可以放到.babelrc文件中
                    // options: {
                    //     presets:['@babel/env'],
                    //     plugins:[
                    //         '@babel/plugin-proposal-class-properties', //支持es6的一些更高级的语法
                    //         '@babel/plugin-transform-runtime'//支持generator生成器 
                    //     ]
                    // }
                }],
                // 不需要加载的文件夹
                // exclude: /node_modules/
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'assets'),
                to: 'assets'
            }
        ])
    ],
    // source map 设置
    devtool: 'cheap-module-eval-source-map' //可定位到源代码行数
}