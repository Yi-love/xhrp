module.exports = {
  entry:{
    index: './src/index.js'
  },
  watch:true,
  module:{
    rules:[{
      test:/\.js/,
      loader:'babel-loader',
      exclude:'/node_module/',
      options:{
        presets:['es2015-loose'],
        plugins:['add-module-exports']
      }
    }]
  },
  output:{
    filename:'[name].js',
    path: __dirname,
    library: 'xhrp',
    libraryTarget:'umd'
  }
};