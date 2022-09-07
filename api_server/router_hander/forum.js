const db = require('../db/index')

exports.addforum = (req, res) => {
  const forumInfo = {
    ...req.body,
    date: new Date(),
  }
  const sql = `select * from forum where forum_id = ?`
  db.query(sql, req.body.forum_id, (err, results) => {
    if (err) return res.cc(err)
    const sql = `insert into forum set?`
    db.query(sql, forumInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return results.cc('新增帖子失败')
      res.cc('新增帖子成功', 0)
    })
  })
}

exports.getPage = (req, res) => {
  const sql = `select * from forum where forum_id order by date DESC`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    let current = Number(req.query.current)
    let pageSize = 10
    let sumpage = Math.ceil(results.length / pageSize)
    if (current == '') {
      let data = results.splice(0, pageSize)
      res.send({
        sumpage: sumpage,
        status: 0,
        message: '获取分页成功',
        data: data,
        total: results.length,
      })
    } else {
      const total = results.length
      let data = results.splice((current - 1) * pageSize, pageSize)
      res.send({
        sumpage: sumpage,
        message: '获取分页成功',
        data: data,
        total,
      })
    }
  })
}

exports.getforum = (req, res) => {
  const sql = `select * from forum where forum_id = ?`
  db.query(sql, req.body.forum_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章数据成功',
      data: results,
    })
  })
}

exports.addcomment = (req, res) => {
  const commentInfo = {
    ...req.body,
    date: new Date(),
  }
  const sql = `SELECT ev_users.* ,forum_comment.* FROM ev_users INNER JOIN forum_comment ON ev_users.username = forum_comment.username where forum_comment.forum_id = ?`
  db.query(sql, req.body.forum_id, (err, results) => {
    if (err) return res.cc(err)
    const sql = `insert into forum_comment set ?`
    db.query(sql, commentInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增失败')
      res.send({
        status: 0,
        message: '留言成功',
        data: commentInfo,
      })
    })
  })
}

exports.getPage1 = (req, res) => {
  const sql = `SELECT ev_users.* ,forum_comment.* FROM ev_users INNER JOIN forum_comment ON ev_users.username = forum_comment.username where forum_comment.forum_id = ?`
  db.query(sql, req.body.forum_id, (err, results) => {
    if (err) return res.cc(err)
    let current = Number(req.query.current)
    let pageSize = 10
    let sumpage = Math.ceil(results.length / pageSize)
    if (current == '') {
      let data = results.splice(0, pageSize)
      res.send({
        sumpage: sumpage,
        status: 0,
        message: '获取分页成功',
        data: data,
        total: results.length,
      })
    } else {
      const total = results.length
      let data = results.splice((current - 1) * pageSize, pageSize)
      res.send({
        sumpage: sumpage,
        message: '获取分页成功',
        data: data,
        total,
      })
    }
  })
}