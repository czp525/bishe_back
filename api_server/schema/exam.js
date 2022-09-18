const joi = require('joi')
const exam_name = joi.string().required()
const exam_type = joi.string().required()
const exam_type_classify = joi.string().required()
const exam_id = joi.number().integer().min(1)
const username = joi.string()
const answer_id = joi.string()
const answer = joi.string()
const values = joi.object()

exports.add_exam_schema = {
  body: {
    exam_name,
    exam_type,
    exam_type_classify,
  }
}

exports.delete_exam_schema = {
  body: {
    exam_id,
  }
}

exports.submite_exam_schema = {
  body: {
    exam_id,
    username,
    answer_id,
    answer,
    values,
  }
}