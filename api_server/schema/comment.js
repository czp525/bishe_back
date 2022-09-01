const joi = require('joi')
const comment_title = joi.string().required()
const comment_writer = joi.string().required()
const comment_body = joi.required()

exports.add_comment_schema = {
  body: {
    comment_title,
    comment_writer,
    comment_body,
  }
}