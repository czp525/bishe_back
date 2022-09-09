const joi = require('joi')
const exam_name = joi.string().required()
const exam_type = joi.string().required()
const exam_type_classify = joi.string().required()
const exam_id = joi.number().integer().min(1).required()

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