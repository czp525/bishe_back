const joi = require('joi')

const article_title = joi.string().required()
const article_content = joi.string().required()
const article_author = joi.string().required()
const article_type = joi.string().required()
const article_status = joi.string().required()
const article_type_classify = joi.string().required()

exports.add_article_schema = {
  body: {
    article_title,
    article_content,
    article_author,
    article_type,
    article_status,
    article_type_classify,
  },
}