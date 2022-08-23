const db = require('../db/index')

exports.getArticleCates = (req, res) => {
  const sql = `select * from article where is_delete = 0 `
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章数据成功',
      data: results[0],
    })
  })
}

exports.addArticleCates = (req, res) => {
  const sql = `select * from article where article_title =?`
  db.query(sql, req.body.articte_title, (err, results) => {
    if (err) return res.cc(err)

    const sql = `insert into article1 set?`
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增文章失败')
      res.cc('新增文章成功', 0)
    })
  })
}

exports.deleteCateById = (req, res) => {
  const sql = `update article set is_delete = 1 where article_id = ?`
  db.query(sql, req.params.article_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章失败')
    res.cc('删除文章成功', 0)
  })
}

exports.getArtCateById = (req, res) => {
  const sql = `select * from article where article_id =?`
  db.query(sql, req.params.article_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类数据失败')
    res.send({
      status: 0,
      message: '获取文章数据成功',
      data: results[0],
    })
  })
}

exports.updateCateById = (req, res) => {
  const sql = `update article set ? where article_id = ?`
  db.query(sql, [req.body, req.body.article_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新文章失败！')
    res.cc('更新文章成功！', 0)
  })
}

exports.getPage = (req, res) => {
  const sql = `select * from article`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    let current = Number(req.query.current)
    let pageSize = 10
    let sumpage = Math.ceil(results.length / pageSize)
    if (current == '') {
      let data = results.splice(0, pageSize)
      res.send({
        sumpage: sumpage,
        status: 200,
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