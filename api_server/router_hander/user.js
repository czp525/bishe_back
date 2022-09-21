const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

//注册账号和密码认证
exports.regUser = (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: '用户名不存在或者不合法！',
    })
  }
  //判断是否被占用
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, [userinfo.username], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length > 0) {
      // return res.send({
      //   status: 1,
      //   message: '用户名被占用'
      // })
      return res.cc('用户名被占用')
    }
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    const sql = 'insert into ev_users set ?'
    db.query(sql, {
      username: userinfo.username,
      password: userinfo.password,
      email: userinfo.email,
      nickname: userinfo.nickname,
      phonenumber: userinfo.phonenumber,
      imgurl: userinfo.imgurl,
    }, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows != 1) return res.cc('注册失败，请稍后再试')
      res.send({
        status: 0,
        message: '注册成功'
      })
    })
  })
}
//登录账户
exports.login = (req, res) => {
  const userinfo = req.body
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, function (err, results) {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！')
    //加密密码
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {
      return res.cc('登录失败！')
    }
    const user = {
      ...results[0],
      password: ''
    }
    //token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h'
    })
    res.send({
      status: 0,
      message: JSON.stringify({
        username: userinfo.username,
        nickname: results[0].nickname,
        imgurl: results[0].imgurl,
        phonenumber: results[0].phonenumber,
        email: results[0].email,
        // password: bcrypt.compareSync(results[0].password),
      }),
      token: 'Bearer ' + tokenStr,
    })
  })
}

//管理员登录
exports.admin_login = (req, res) => {

  const userinfo = req.body
  const sql = `select * from admin where admin_name = ?`
  db.query(sql, userinfo.admin_name, function (err, results) {

    if (err) return res.cc(err)
    if (userinfo.admin_name !== `mengchuang` || userinfo.admin_password !== `66666666`) {
      return res.cc('登录失败')
    }
    const user = {
      ...results[0],
      password: ''
    }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h'
    })
    res.send({
      status: 0,
      message: JSON.stringify({
        admin_name: userinfo.admin_name,
      }),
      token: 'Bearer ' + tokenStr,
    })
  })
}