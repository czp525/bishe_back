const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
  delete_exam_schema,
  submite_exam_schema,
} = require('../schema/exam')
const exam_handler = require('../router_hander/exam')

router.get('/getexam', exam_handler.getexam)
router.post('/deleteexam', expressJoi(delete_exam_schema), exam_handler.deleteexam)
router.post('/question', exam_handler.question)
router.post('/submitexam', expressJoi(submite_exam_schema), exam_handler.submitexam)
router.post('/garde', exam_handler.garde)
// router.post('/adderror', exam_handler.adderror)
router.post('/search', exam_handler.search)
router.post('/examresult', exam_handler.examresult)
router.post('/errexam', exam_handler.errexam)
router.post('/addquestion', exam_handler.addquestion)
router.post('/updateexam', exam_handler.updateexam)

module.exports = router