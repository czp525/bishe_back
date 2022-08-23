const joi = require('joi')
const video_id = joi.number().integer().min(1).required()
const video_title = joi.string().required()
const video_type = joi.string().required()
const video_type_classify = joi.string().required()
const video_author = joi.string().required()
const video_introduce = joi.string().required()
const video_date = joi.string().required()

exports.add_video_schema = {
  body: {
    video_id,
    video_title,
    video_type,
    video_type_classify,
    video_author,
    video_introduce,
  },
}

exports.delete_video_schema = {
  params: {
    video_id,
  },
}