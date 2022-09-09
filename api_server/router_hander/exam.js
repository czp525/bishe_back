const db = require('../db/index')


exports.addexam = (req, res) => {
  const examInfo = {
    ...req.body,
  }
  const sql = `select * from exam`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    const sql = `insert into exam set?`
    db.query(sql, examInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增试题失败')
      res.cc('新增视频成功', 0)
    })
  })
}

exports.getexam = (req, res) => {
  const sql = `select * from exam where is_delete = 0`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    if (err) return res.cc(err)
    let current = Number(req.query.current)
    let pageSize = 10
    let sumpage = Math.ceil(results.length / pageSize)
    if (current == '') {
      let data = results.splice(0, pageSize)
      res.send({
        sumpage: sumpage,
        status: 0,
        message: '获取信息成功',
        data: data,
        total: results.length,
      })
    } else {
      const total = results.length
      let data = results.splice((current - 1) * pageSize, pageSize)
      res.send({
        sumpage: sumpage,
        message: '获取信息成功',
        data: data,
        total,
      })
    }
  })
}

exports.deleteexam = (req, res) => {
  const sql = `update exam set is_delete = 1 where exam_id = ?`
  db.query(sql, req.body.exam_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章失败')
    res.cc('删除文章成功', 0)
  })
}