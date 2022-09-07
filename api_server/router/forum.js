const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const forum_handler = require('../router_hander/forum')
const {
  add_forum_schema,
  add_comment_schema,
} = require('../schema/forum')

router.get('/getpage', forum_handler.getPage)
router.get('/getpage1', forum_handler.getPage1)
router.get('/getforum', forum_handler.getforum)
router.post('/addforum', expressJoi(add_forum_schema), forum_handler.addforum)
router.post('/addcomment', expressJoi(add_comment_schema), forum_handler.addcomment)

module.exports = router