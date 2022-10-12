//这是生产环境下的配置文件
const path = require('path'); //引入node中内置的path模块，解决路劲问题
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件,用于提供html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //用于提取css为单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //用于处理css压缩
const baseCss = ['style-loader','css-loader']
//使用cjs模块化功能，暴露一个对象，该对象是webpack的详细配置对象
module.exports = {
  mode: 'production', //工作模式
  entry: './src/js/app.js',  //入口文件
  output: { //出口文件
    path: path.resolve(__dirname, '../build'), //输出文件的路径
    filename: 'js/app.js', //输出文件的名字
    publicPath:'/build/'
    },
    //module.rules中配置的一个一个loader
    module: {
      rules: [
        //配置解析css
        {
          test: /\.css$/, //该loader要处理的文件
          use: [ //后指定的loader先执行，即css-loader先执行
            // 'style-loader' //创建style标签将样式资源插入，添加到head中生效
            MiniCssExtractPlugin.loader,
            'css-loader', //将css文件变成commonjs模块加载js中，里面内容是样式字符串
            {
              loader: "postcss-loader", //用于在webpack里使用postcss库
              options: {
                postcssOptions: {
                  plugins: [
                   "postcss-preset-env", //兼容的环境设置
                  ],
                },
              },
            },
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
        //配置js的语法检查
        {
          test:/\.js$/,//对js进行语法检查
          exclude:/node_modules/,
          enforce:'pre',//优先执行这个loader
          loader:'eslint-loader',
          options:{
            fix:true, //js语法若有问题可以自动修复
          }
        },
        //配置js语法转换
        {
          test:/\.js$/,
          exclude:/node_modules/,
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      ],
    },    
    //plugins中专门用于配置插件，插件必须经过实例化这一个环节
    plugins: [
      new HtmlWebpackPlugin({
        template:'./src/index.html'  //提供模板位置
      }),
      new MiniCssExtractPlugin({
        filename:'/css/index.css' //指定单独生产css文件的路径和名字
      }),//用于提取css为单独文件
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }], //default使用默认的压缩配置 , removeAll移除所有注释
        },
      })
    ],
   
  };