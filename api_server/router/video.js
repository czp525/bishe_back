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

const video_handler = require('../router_hander/video')
router.get('/video', video_handler.getVideo)
router.get('/changevideo1/:video_id', video_handler.changeVideo1)
router.get('/delete/:video_id', expressJoi(delete_video_schema), video_handler.deleteVideoById)
router.get('/getpage1', video_handler.getPage)
router.get('/randvideo', video_handler.randVideo)
router.get('/videolist', video_handler.videolist)
router.post('/addvideo', expressJoi(add_video_schema), video_handler.addVideos)
router.post('/updatevideo', video_handler.updateVideoById)
// router.post('/changevideo', expressJoi(change_video_schema), video_hander.changeVideo)
router.post('/search1', expressJoi(search_video_schema), video_handler.searchVideo1)

module.exports = router