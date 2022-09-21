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
  const sql = `select * from video where title = ?`
  db.query(sql, videoInfo.title, (err, results) => {
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
  const sql = `update video set is_delete = 1 where video_id = ?`
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
  const sql = `select * from video where is_delete = 0`
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
      var timestamp = results[i].video_date.getTime();
      time = timestampToTime(timestamp);
      results[i].video_date = time
      console.log(results[i].date);
    }
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

// exports.changeVideo = (req, res) => {
//   const sql = `update video set ? where video_id = ? `
//   db.query(sql, [req.body, req.body.video_id], (err, results) => {
//     console.log(req.body);
//     if (err) return res.cc(err)
//     if (results.affectedRows !== 1) return res.cc('更新视频失败！')
//     res.cc('更新视频成功', 0)
//   })
// }

exports.changeVideo1 = (req, res) => {
  const sql = `select * from video where video_id = ?`
  db.query(sql, req.params.video_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取视频数据成功',
      data: results[0],
    })
  })
}

exports.searchVideo1 = (req, res) => {
  //处理字符串
  const sql = `select * from video where title LIKE '%${req.body.value}%' or author LIKE '%${req.body.value}%'`
  db.query(sql, req.body.value, (err, results) => {
    if (err) return res.cc(err)
    if (results.length == 0) return res.cc('搜索失败')
    res.send({
      status: 0,
      message: '获取视频数据成功',
      data: results,
      total: results.length,
    })
  })
}

exports.randVideo = (req, res) => {
  const sql = `select video_id,video_pic from video ORDER BY RAND() LIMIT 4`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '随机获取成功',
      data: results,
    })
  })
}

exports.videolist = (req, res) => {
  const sql = `select video_id,title,clicknum from video order by clicknum DESC limit 8`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取排行榜成功',
      data: results,
    })
  })
}

exports.addvideocomment = (req, res) => {
  const commentInfo = {
    ...req.body,
    date: new Date(),
  }
  const sql = `SELECT ev_users.* , video_comment.* FROM ev_users INNER JOIN video_comment ON ev_users.username = video_comment.username where video_comment.video_id = ?`
  db.query(sql, req.body.video_id, (err, result) => {
    if (err) return res.cc(err)
    const sql = `insert into video_comment set ?`
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

exports.getVideoComment = (req, res) => {
  const videoInfo = {
    ...req.body,
  }
  const sql = `SELECT ev_users.* , video_comment.* FROM ev_users INNER JOIN video_comment ON ev_users.username = video_comment.username where video_comment.video_id = ?`
  db.query(sql, videoInfo.video_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取评论成功',
      data: results,
    })
  })
}

exports.Duration = (req, res) => {
  const sql = `SELECT ev_users.username ,video_process.process,video_process.video_id,video_process.curprocess FROM ev_users INNER JOIN video_process ON ev_users.username = video_process.username where video_process.username = ? And video_process.video_id = ?`

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
  db.query(sql, [req.body.username, req.body.video_id], (err, result) => {
    if (result.length === 0) {
      const process = ((req.body.curprocess * 1) / (req.body.process * 1) * 100) + '%'
      const sql = `insert into video_process set ?`
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
        const sql = `update video_process set ? where username =? And video_id =?`
        db.query(sql, [req.body, req.body.username, req.body.video_id], (err, results) => {
          const process = Math.ceil(((req.body.curprocess * 1) / (result[0].process * 1)) * 100) + '%'
          const process1Info = {
            propercent: process,
            date: timestampToTime(timestamp),
          }
          const sql = `update video_process set ? where username =? And video_id =?`
          db.query(sql, [process1Info, req.body.username, req.body.video_id], (err, results) => {
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

exports.getduration = (req, res) => {
  const sql = `SELECT video_process.username,video_process.propercent,video_process.date,video.title FROM video_process INNER JOIN video ON  video_process.video_id = video.video_id `
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