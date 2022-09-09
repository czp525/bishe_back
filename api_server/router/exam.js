const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  add_exam_schema,
  delete_exam_schema,
} = require('../schema/exam')
const exam_handler = require('../router_hander/exam')

router.get('/getexam', exam_handler.getexam)
router.post('/addexam', expressJoi(add_exam_schema), exam_handler.addexam)
router.post('/deleteexam', expressJoi(delete_exam_schema), exam_handler.deleteexam)

module.exports = router