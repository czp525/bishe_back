const joi = require('joi')
const forum_title = joi.string().required()
const forum_writer = joi.string().required()
const forum_body = joi.required()
const forum_id = joi.number().integer().min(1)
const username = joi.string().required()
const forum_comment = joi.string().required()

exports.add_forum_schema = {
  body: {
    forum_title,
    forum_writer,
    forum_body,
    forum_id,
  }
}

exports.add_comment_schema = {
  body: {
    forum_id,
    forum_comment,
    username,
  }
}