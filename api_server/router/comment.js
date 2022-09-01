const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const comment_handler = require('../router_hander/comment')
const {
  add_comment_schema,
} = require('../schema/comment')

router.get('/comment', comment_handler.getComment)
router.get('getpage2', comment_handler.getPage)
router.post('/addcomment', expressJoi(add_comment_schema), comment_handler.addComment)

module.exports = router