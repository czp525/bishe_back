const db = require('../db/index')

exports.addArticle = (req, res) => {
  // if (!req.file || req.file.fieldname !== 'cover_img')
  //   return res.cc('文章封面是必选参数！')
  // const path = require('path')
  // console.log(req.body);
  const articleInfo = {
    ...req.body,
    // cover_img: path.join('/uploads', req.file.fieldname),
    // author_id: req.body.id,
    article_date: new Date(),
  }
  // console.log(articleInfo);
  const sql = `insert into article set ?`
  db.query(sql, articleInfo, (err, results) => {
    if (err) {
      console.log(err)
      return res.cc(err)
    }
    if (results.affectedRows !== 1) return res.cc('发布失败')
    res.cc('发布成功', 0)
  })
}