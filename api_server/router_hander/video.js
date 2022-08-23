const db = require('../db/index');

exports.getVideo = (req, res) => {
  const sql = `select * from video where is_delete = 0`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取视频数据成功',
      data: results[0],
    })
  })
}

exports.addVideos = (req, res) => {
  const videoInfo = {
    ...req.body,
    video_date: new Date(),
  }
  const sql = `select * from video where video_id = ?`
  db.query(sql, videoInfo.video_id, (err, results) => {
    if (err) return res.cc(err)
    const sql = `insert into video set?`
    db.query(sql, videoInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增视频失败')
      res.cc('新增视频成功', 0)
    })
  })
}

// exports.addVideo1 = (req, res) => {
//   const video1Info = {
//     ...req.body
//   }
//   const sql = `select * from video where video_id = ?`
//   db.query(sql, videoInfo.video_id, (err, results) => {
//     if (err) return res.cc(err)
//     const sql = `insert into video set?`
//     if (err) return res.cc(err)
//     if (results.affectedRows !== 1) return res.cc('新增失败')
//     res.cc('新增成功', 0)
//   })
// }

exports.deleteVideoById = (req, res) => {
  const sql = `update video set video_id = 1 where video_id = ?`
  db.query(sql, req.params.video_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除视频失败')
    res.cc('删除视频成功', 0)
  })
}

exports.updateVideoById = (req, res) => {
  const sql = `update video set ? where video_id = ?`
  db.query(sql, [req.body, req.body.video_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新视频失败！')
    res.cc('更新视频成功', 0)
  })
}

exports.getPage = (req, res) => {
  const sql = `select * from video`
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