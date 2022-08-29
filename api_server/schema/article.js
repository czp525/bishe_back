const joi = require('joi')
const title = joi.string().required()
const article_id = joi.number().integer().min(1).required()
const article_type = joi.string().required()
const article_type_classify = joi.string().required()
const author = joi.string().required()
const article_introduce = joi.string().required()
const article_text = joi.required()
const article_html = joi.required()
const value = joi.string().required()

exports.add_article_schema = {
  body: {
    title,
    article_type,
    article_type_classify,
    author,
    article_introduce,
    article_text,
    article_html,
  },
}

exports.delete_article_schema = {
  params: {
    article_id,
  },
}

exports.get_article_schema = {
  params: {
    article_id,
  },
}

exports.update_article_schema = {
  body: {
    Id: article_id,
    name: title,
  },
}

exports.change_article_schema = {
  body: {
    title,
    author,
    article_introduce,
    article_text,
    article_html,
    article_id,
  },
}

exports.search_article_schema = {
  body: {
    value,
  },
}