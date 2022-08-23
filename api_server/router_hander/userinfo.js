const db = require('../db/index')
const bcrypt = require('bcryptjs')

//获取用户基本信息
exports.getUserInfo = (req, res) => {
  const sql = `select * from ev_users where username=?`
  db.query(sql, [req.user.username], (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取失败')
    res.send({
      status: 0,
      message: '获取成功',
      data: results[0],
    })
  })
}
//修改用户信息
exports.updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where username =?`
  db.query(sql, [req.body, req.body.username], (err, results) => {
    const userinfo = req.body
    if (results.affectedRows !== 1) return res.cc('失败')
    res.send({
      status: 0,
      message: JSON.stringify({
        username: userinfo.username,
        nickname: userinfo.nickname,
        // imgurl: results[0].imgurl,
        phonenumber: userinfo.phonenumber,
        email: userinfo.email,
        // password: bcrypt.compareSync(results[0].password),
        // imgurl: userinfo.imgurl,
      }),
    })
  })
}
//修改密码
exports.updatePassword = (req, res) => {
  const sql = `select * from ev_users where username =?`
  db.query(sql, req.user.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在')

    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误')

    const sql = `update ev_users SET password =? WHERE username =?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    db.query(sql, [newPwd, req.user.username], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新密码失败')

      res.cc('更新密码成功', 0)
    })
  })
}
//修改头像
exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set imgurl =? where username =?`
  db.query(sql, [req.body.avatar, req.user.username], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新头像失败')
    res.cc('更新头像成功', 0)
  })
}