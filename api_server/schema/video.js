const joi = require('joi')
const video_id = joi.number().integer().min(1).required()
const title = joi.string().required()
const video_type = joi.string().required()
const video_type_classify = joi.string().required()
const author = joi.string().required()
const video_introduce = joi.string().required()
const video_date = joi.string().required()
const video_url = joi.string().required()
const value = joi.string().required()
const username = joi.string().required()
const video_comment = joi.string().required()
const curprocess = joi.required()
const process = joi.required()

exports.add_video_schema = {
  body: {
    // video_id,
    title,
    video_type,
    video_type_classify,
    author,
    video_introduce,
    video_url,
  },
}

exports.delete_video_schema = {
  params: {
    video_id,
  },
}

exports.change_video_schema = {
  body: {
    title,
    author,
    video_introduce,
    video_url,
    video_id,
  },
}

exports.search_video_schema = {
  body: {
    value,
  },
}

exports.add_videocomment_schema = {
  body: {
    video_id,
    video_comment,
    username,
  }
}

exports.get_videocomment_schema = {
  body: {
    video_id,
  }
}

exports.duration_schema = {
  body: {
    username,
    process,
    curprocess,
    video_id,
  }
}

exports.updateduration_schema = {
  body: {
    username,
    process,
    curprocess,
    video_id,
  }
}