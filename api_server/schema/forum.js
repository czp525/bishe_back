const joi = require("joi");
const forum_title = joi.string().required();
const forum_body = joi.required();
const forum_id = joi.number().integer().min(1);
const username = joi.string();
const forum_comment = joi.string().required();
const current = joi.number();
const nickname = joi.string();

exports.add_forum_schema = {
  body: {
    forum_title,
    nickname,
    forum_body,
    username,
  },
};

exports.add_comment_schema = {
  body: {
    forum_id,
    forum_comment,
    username,
  },
};

exports.get_forum_schema = {
  body: {
    forum_id,
  },
};

exports.getpage_forum_schema = {
  params: {
    forum_id,
  },
};
