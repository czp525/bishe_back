const cors = require("cors");
const express = require("express");
const bdParser = require("body-parser"); // 挂载文章路由前缀
const videoRouter = require("../router/video");
const articleRouter = require("../router/article");
const userRouter = require("../router/user");
const userinfoRouter = require("../router/userinfo");
const forumRouter = require("../router/forum");
const examRouter = require("../router/exam");
const path = require("path");

module.exports = (app) => {
  app.use(
    bdParser.urlencoded({
      extended: false,
    })
  );
  app.use(bdParser.json());
  app.use(cors());
  const allowCors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  };
  app.use(allowCors);
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(express.json()); //错误中间件
  app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
      res.send({
        status,
        message: err instanceof Error ? err.message : err,
      });
    };
    next();
  });

  app.use("/my/article", articleRouter);
  app.use("/my/video", videoRouter);
  app.use("/api", userRouter);
  app.use("/my", userinfoRouter);
  app.use("/my/forum", forumRouter);
  app.use("/my/exam", examRouter);
  //身份认证
  app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.cc(err);
    if (err.name === "UnauthorizedError") return res.cc("身份认证失败");
    res.cc(err);
  });

  const Joi = require("joi");
};
