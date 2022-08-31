const db = require('../db/index')

exports.getArticles = (req, res) => {
  const sql = `select * from article where is_delete = 0 `
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章数据成功',
      data: results,
    })
  })
}

exports.addArticles = (req, res) => {
  const articleInfo = {
    ...req.body,
    article_date: new Date(),
  }
  const sql = `select * from article where title = ?`
  db.query(sql, req.body.title, (err, results) => {

    if (err) return res.cc(err)
    const sql = `insert into article set?`
    db.query(sql, articleInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增文章失败')
      res.cc('新增文章成功', 0)
    })
  })
}

exports.deleteArticleById = (req, res) => {
  const sql = `update article set is_delete = 1 where article_id = ?`
  db.query(sql, req.params.article_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章失败')
    res.cc('删除文章成功', 0)
  })
}

exports.getArticleById = (req, res) => {
  const sql = `select * from article where article_id =?`
  db.query(sql, req.params.article_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章数据失败')
    res.send({
      status: 0,
      message: '获取文章数据成功',
      data: results[0],
    })
  })
}

exports.updateArticleById = (req, res) => {
  const sql = `update article set ? where article_id = ?`
  db.query(sql, [req.body, req.body.article_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新文章失败！')
    res.cc('更新文章成功！', 0)
  })
}

exports.getPage = (req, res) => {
  const sql = `select * from article where is_delete = 0`
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

exports.changeArticle = (req, res) => {
  const sql = `select * from article where article_id = ?`
  db.query(sql, req.params.article_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章数据成功',
      data: results[0],
    })
  })
}

// exports.changeArticle1 = (req, res) => {
//   const sql = `update article set ? where article_id = ? `
//   db.query(sql, [req.body, req.body.article_id], (err, results) => {
//     if (err) return res.cc(err)
//     if (results.affectedRows !== 1) return res.cc('更新文章失败！')

//     res.cc('更新文章成功', 0)
//   })
// }

exports.searchArticle = (req, res) => {
  const sql = `select * from article where title LIKE '%${req.body.value}%' or author LIKE '%${req.body.value}%'`
  db.query(sql, req.body.value, (err, results) => {
    if (err) return res.cc(err)
    if (results.length == 0) return res.cc('搜索失败')
    res.send({
      status: 0,
      message: '获取文章数据成功',
      data: results,
      total: results.length,
    })

  })
}

exports.randArticle = (req, res) => {
  const sql = `select article_id,article_pic from article ORDER BY RAND() LIMIT 4`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '随机获取成功',
      data: results,
    })
  })
}

exports.articlelist = (req, res) => {
  const sql = `select article_id,title,clicknum from article order by clicknum DESC limit 8`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取排行榜成功',
      data: results,
    })
  })
}