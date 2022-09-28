const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const path = require("path");
const multer = require("multer");
const config = require("./config");

// 验证权限范围除了带 / api以外的路径
// app.use(expressJWT({
//   secret: config.jwtSecretKey
// }).unless({
//   path: [/^\/api\//]
// }))

app.listen(8088, function () {
  console.log("api server running at http://10.2.13.142");
});

app.use("/files", express.static(path.join(__dirname + "../../files")));
// 写文件功能
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    const type = file.mimetype.match(/(?<=\/)[a-zA-Z0-9]+/);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${type}`);
  },
});
const upload = multer({
  storage: storage,
}).single("file");

const uploadFile = async (req, res) => {
  upload(req, res, function (err) {
    // console.log(req.file);
    res.send(req.file);
  });
};

app.post("/uploadFile", uploadFile);
