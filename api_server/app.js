const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const multer = require('multer')
const bdParser = require('body-parser');
app.use(bdParser.urlencoded({
  extended: false
}));
app.use(bdParser.json());

const cors = require('cors')
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

const config = require('./config')
//验证权限范围除了带/api以外的路径
// app.use(expressJWT({
//   secret: config.jwtSecretKey
// }).unless({
//   path: [/^\/api\//]
// }))

const userRouter = require('./router/user')
app.use('/api', userRouter)
//身份认证
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  res.cc(err)
})
const userinfoRouter = require('./router/userinfo')
const Joi = require('joi')
app.use('/my', userinfoRouter)

// 挂载文章路由前缀
const artCateRouter = require('./router/artcate')
app.use('/my/artcate', artCateRouter)

const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

const videoRouter = require('./router/video')
app.use('/my', videoRouter)

app.post('/profile', function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    console.log(req.file, req.body)
  })
})

app.listen(8088, function () {
  console.log('api server running at http://10.2.13.116:8088')
})


// 写文件功能
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    console.log(file);
    const type = file.mimetype.match(/(?<=\/)[a-zA-Z0-9]+/);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + `.${type}`)
  }
})
const upload = multer({
  storage: storage
}).single("file");

const uploadFile = async (req, res) => {
  console.log(req);
  upload(req, res, function (err) {
    console.log(req.file);
    res.send(req.file);
  })
}

app.post("/uploadFile", uploadFile);