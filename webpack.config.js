const path = require('path')
// 
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
                        outputPath:'images',
                        name:'[name]-[hash:4].[.ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf)$/,
                use: ['url-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'./src/index.html'
        })
    ]
}