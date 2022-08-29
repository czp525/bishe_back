const joi = require('joi')
const username = joi.string().required()
const email = joi.string().email().required()
const nickname = joi.string().required()
const admin_name = joi.string()
const admin_password = joi.string().required()
const phonenumber = joi.required()
const avatar = joi.string().required()
const value = joi.string().required()
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}

exports.admin_login_schema = {
  body: {
    admin_name,
    admin_password,
  },
}

exports.update_userinfo_schema = {
  body: {
    username,
    email,
    nickname,
    phonenumber,
  },
}

exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}

exports.update_avatar_schema = {
  body: {
    avatar,
  },
}

exports.user_search_schema = {
  body: {
    value,
  },
}