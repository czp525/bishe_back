const cors = require('cors');
const express = require('express');
const bdParser = require('body-parser');
const videoRouter = require('../router/video')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
// 挂载文章路由前缀
const artCateRouter = require('../router/artcate')
const userRouter = require('../router/user')
const userinfoRouter = require('../router/userinfo')
const articleRouter = require('../router/article')

module.exports = (app) => {
  app.use(bdParser.urlencoded({
    extended: false
  }));
  app.use(bdParser.json());
  app.use(cors())
  app.use(express.urlencoded({
    extended: false
  }))
  app.use(express.json())
  //错误中间件
  app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
      res.send({
        status,
        message: err instanceof Error ? err.message : err,
      })
    }
    next()
  })

  app.use('/my/artcate', artCateRouter)

  app.use('/my/article', articleRouter)

  app.use('/my', videoRouter)
  app.use('/api', userRouter)
  //身份认证
  app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    res.cc(err)
  })

  const Joi = require('joi')
  app.use('/my', userinfoRouter)

}