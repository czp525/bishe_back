const db = require('../db/index')

exports.getComment = (req, res) => {
  const sql = `select * from comments where comment_id`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取评论成功',
      data: results,
    })
  })
}

exports.addComment = (req, res) => {
  const commentInfo = {
    ...req.body,
    comment_data: new Data(),
  }
  const sql = `select * from comment where comment_id = ?`
  db.query(sql, commentInfo.comment_id, (err, results) => {
    if (err) return res.cc(err)
    const sql = `insert into comment set?`
    db.query(sql, commentInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return results.cc('新增评论失败')
      res.cc('新增评论成功', 0)
    })
  })
}

exports.getPage = (req, res) => {
  const sql = `select * from comment where comment_id`
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