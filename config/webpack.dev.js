//该文件是webpack的配置文件，所有webpack的任务用到的loader，plugins都要配置在这里，且该文件要复合cmjs规范
const path = require('path'); //引入node中内置的path模块，解决路劲问题
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件 
const baseCss = ['style-loader','css-loader']
//使用cjs模块化功能，暴露一个对象，该对象是webpack的详细配置对象
module.exports = {
  mode: 'development', //工作模式
  entry: './src/js/app.js',  //入口文件
  output: { //出口文件
    path: path.resolve(__dirname, 'build'), //输出文件的路径
    filename: 'js/app.js', //输出文件的名字
    },
    //module.rules中配置的一个一个loader
    module: {
      rules: [
        //配置解析css
        {
          test: /\.css$/, //该loader要处理的文件
          use: [ //后指定的loader先执行，即css-loader先执行
            'style-loader' //创建style标签将样式资源插入，添加到head中生效
          , 'css-loader' //将css文件变成commonjs模块加载js中，里面内容是样式字符串
        ],
        },
        //配置解析less
        {
          test: /\.less$/, //该loader要处理的文件
          use: [...baseCss,'less-loader'],
        },
        //配置解析样式中的图片
        {
          test: /\.(png|jpg|gif)$/,
          use: [{
            // loader:'file-loader',
            loader:'url-loader',  //它是file-loader的上层封装，它有一个limit配置，小于该limit可以转换成base64编码
            options:{
              outputPath:'imgs', //配置图片加工后存放的位置  可以不用加/
              // publicPath:'/build/imgs',  如果outputPath加了/的话需要配置这一项
              name:'[hash:5].[ext]', //配置生成图片的名字和后缀   ：5的意思是只取哈希值前五位
              limit:8*1024, //图片大小小于8KB时，将图片转换为base64编码
              // esModule:false,
            }
          }],
        },
        //配置解析html中的图片
        {
          test: /\.html$/i,
          use: ["html-loader"],
        },
        //配置解析其他处理的文件
        {
          exclude: /\.(html|less|css|png|jpg|js|gif|json)$/, //排除这些格式的文件
          use: [{
            loader:'file-loader', //这个loader用来复制一份到build文件里
            options:{
              outputPath:'media', //配置其他资源加工后存放的位置  可以不用加/
              name:'[hash:5].[ext]', //  ：5的意思是只取哈希值前五位
            }
          }],
        },
      ],
    },    
    //plugins中专门用于配置插件，插件必须经过实例化这一个环节
    plugins: [
      new HtmlWebpackPlugin({
        template:'./src/index.html'  //提供模板位置
      })
    ],
    devServer:{
      port:5000,//开启5000的端口号
      open:true,//自动打开浏览器
      hot:true,//模块热更新，不刷新页面，哪里修改了就更新哪里
    }
  };