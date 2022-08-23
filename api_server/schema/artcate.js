const joi = require('joi')
const article_title = joi.string().required()
const article_id = joi.number().integer().min(1).required()

exports.add_cate_schema = {
  body: {
    article_title,
  },
}

exports.delete_cate_schema = {
  params: {
    article_id,
  },
}

exports.get_cate_schema = {
  params: {
    article_id,
  },
}

exports.update_cate_schema = {
  body: {
    Id: article_id,
    name: article_title,
  },
}