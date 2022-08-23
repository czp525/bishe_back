const express = require('express')
const router = express.Router()

const userHandler = require('../router_hander/user')
const expressJoi = require('@escook/express-joi')
const {
  admin_login_schema
} = require('../schema/user')


router.post('/reguser', userHandler.regUser)

router.post('/login', userHandler.login)

router.post('/admin_login', expressJoi(admin_login_schema), userHandler.admin_login)

module.exports = router