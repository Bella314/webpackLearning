const path = require('path')
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
    mode: 'production' ,//默认为production（生产环境） 项目完成后打包使用 development（开发环境）下便于开发热加载，可根据不同的环境做不同的配置 q区分打包
    module:{
        rules:[
            // 配置用来解析.css文件的loader（css-loader：解析css文件 和style-loader：将解析出来的结果放到html中生效）
            {
                // 用正则匹配当前访问的文件的后缀名是 .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            }
        ]
    }
}