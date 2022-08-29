const express = require('express')
const router = express.Router()
const db = require('../db/index')
const userinfo_handler = require('../router_hander/userinfo')
const expressJoi = require('@escook/express-joi')
//导入验证数据的中间件

const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
  user_search_schema,
} = require('../schema/user')

router.get('/userinfo', userinfo_handler.getUserInfo)
router.post('/updateuserinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
router.post('/updateavatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)
router.post('/usersearch', expressJoi(user_search_schema), userinfo_handler.userSearch)

module.exports = router