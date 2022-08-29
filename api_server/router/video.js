const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const multer = require('multer')
const upload = multer({
  dest: 'uploads/'
})

const {
  add_video_schema,
  delete_video_schema,
  change_video_schema,
  search_video_schema,
} = require('../schema/video')

const video_hander = require('../router_hander/video')
router.get('/video', video_hander.getVideo)
router.get('/changevideo1/:video_id', video_hander.changeVideo1)
router.get('/delete/:video_id', expressJoi(delete_video_schema), video_hander.deleteVideoById)
router.get('/getpage1', video_hander.getPage)
router.post('/addvideo', expressJoi(add_video_schema), video_hander.addVideos)
router.post('/updatevideo', video_hander.updateVideoById)
// router.post('/changevideo', expressJoi(change_video_schema), video_hander.changeVideo)
router.post('/search1', expressJoi(search_video_schema), video_hander.searchVideo1)

module.exports = router