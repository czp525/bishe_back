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

exports.addarticlecomment = (req, res) => {
  const commentInfo = {
    ...req.body,
    date: new Date(),
  }
  const sql = `SELECT ev_users.* , article_comment.* FROM ev_users INNER JOIN article_comment ON ev_users.username = article_comment.username where article_comment.article_id = ?`
  db.query(sql, req.body.article_id, (err, results) => {
    if (err) return res.cc(err)
    const sql = `insert into article_comment set ?`
    db.query(sql, commentInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增评论失败')
      res.send({
        status: 0,
        message: '评论成功',
        data: results,
      })
    })
  })
}

exports.getArticleComment = (req, res) => {
  const articleInfo = {
    ...req.body,
  }
  const sql = `SELECT ev_users.* , article_comment.* FROM ev_users INNER JOIN article_comment ON ev_users.username = article_comment.username where article_comment.article_id = ?`
  db.query(sql, articleInfo.article_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取评论成功',
      data: results,
    })
  })
}

exports.duration1 = (req, res) => {
  const sql = `SELECT ev_users.username ,article_process.process,article_process.article_id,article_process.curprocess FROM ev_users INNER JOIN article_process ON ev_users.username = article_process.username where article_process.username = ? And article_process.article_id = ?`

  function timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
  }
  let date = new Date()
  var timestamp = new Date().getTime();
  db.query(sql, [req.body.username, req.body.article_id], (err, result) => {
    if (result.length === 0) {
      const process = ((req.body.curprocess * 1) / (req.body.process * 1) * 100) + '%'
      const sql = `insert into article_process set ?`
      const process1Info = {
        propercent: process,
        ...req.body,
        date: timestampToTime(timestamp),
      }
      db.query(sql, process1Info, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('新增进度失败')
        res.send({
          status: 0,
          message: '新增进度成功',
          data: process1Info,
        })
      })
    } else {
      if ((req.body.curprocess * 1) >= (result[0].curprocess * 1)) {
        const sql = `update article_process set ? where username =? And article_id =?`
        db.query(sql, [req.body, req.body.username, req.body.article_id], (err, results) => {
          const process = Math.ceil(((req.body.curprocess * 1) / (result[0].process * 1)) * 100) + '%'
          const process1Info = {
            propercent: process,
            date: timestampToTime(timestamp),
          }
          const sql = `update article_process set ? where username =? And article_id =?`
          db.query(sql, [process1Info, req.body.username, req.body.article_id], (err, results) => {
            if (err) return res.cc(err)
            res.send({
              status: 0,
              message: '更新进度成功',
              data: req.body,
            })
          })
        })
      } else {
        console.log('失败');
      }
    }
  })
}

exports.getduration1 = (req, res) => {
  const sql = `SELECT article_process.username,article_process.propercent,article_process.date,article.title FROM article_process INNER JOIN article ON  article_process.article_id = article.article_id `
  db.query(sql, (err, results) => {
    function timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y + M + D + h + m + s;
    }
    for (let i = 0; i <= results.length - 1; i++) {
      var timestamp = results[i].date.getTime();
      time = timestampToTime(timestamp);
      results[i].date = time
    }
    if (err) return res.cc(err)
    let current = Number(req.query.current)
    let pageSize = 10
    let sumpage = Math.ceil(results.length / pageSize)
    if (current == '') {
      let data = results.splice(0, pageSize)
      res.send({
        sumpage: sumpage,
        status: 0,
        message: '获取成功1',
        data: data,
        total: results.length,
      })
    } else {
      const total = results.length
      let data = results.splice((current - 1) * pageSize, pageSize)
      res.send({
        sumpage: sumpage,
        message: '获取成功',
        data: data,
        date: time,
        total,
      })
    }
  })
}