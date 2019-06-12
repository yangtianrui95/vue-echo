const path = require('path');

module.exports = {
  publicPath: '/',

  devServer: {
    port: 8888,
    open: true
  },

  css: {
    sourceMap: false,
    modules: false,
    loaderOptions: {
      stylus: {
        // 全局引入global.styl文件
        import: [path.resolve(__dirname, './src/assets') + '/index.styl']
      }
    }
  }

};