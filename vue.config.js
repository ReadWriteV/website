const path = require('path')
const express = require('express')

const app = express()

var blogs = require('./public/data/blogs.json')

var apiRoutes = express.Router();
app.use('/api',apiRoutes)

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('services', path.resolve(__dirname, './src/services'))
  },
  devServer:{
    before(app) {
      app.get('/api/blogs', (req, res) => {
        res.json({              
          data: blogs
        })
      })
    }
  }
}
