const {
  request
} = require('express')
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
    console.log(req);
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章失败')
    res.cc('删除文章成功', 0)
  })
}

exports.question = (req, res) => {
  const sql = `select question_id,question_body,question_option_A,question_option_B,question_option_C,question_option_D from question where exam_id = ?`
  db.query(sql, req.body.exam_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取试题成功',
      data: results,
    })
  })
}

exports.submitexam = (req, res) => {
  const sql = `select * from user_answer `
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    const sql = `SELECT * FROM user_answer WHERE username = ? AND exam_id=?`
    db.query(sql, [req.body.username, req.body.exam_id], (err, results) => {
      if (results.length === 0) {
        var arr = new Array();
        for (var i = 0; i <= [...Object.entries(req.body.values)].length - 1; i++) {
          for (var j = 0; j <= 0; j++) {
            const sql = `insert into user_answer set answer_id = ? ,answer = ?, exam_id = ?,username = ?`
            db.query(sql, [
              [...Object.entries(req.body.values)][i][0],
              [...Object.entries(req.body.values)][i][1], req.body.exam_id, req.body.username,
            ], (err, results) => {
              console.log('成功');
            })
          }
        }
      } else {
        var arr = new Array();
        for (var i = 0; i <= [...Object.entries(req.body.values)].length - 1; i++) {
          for (var j = 0; j <= 0; j++) {
            const sql = `UPDATE user_answer set answer = ? WHERE answer_id = ? AND exam_id = ? AND username = ?`
            db.query(sql, [
              [...Object.entries(req.body.values)][i][1],
              [...Object.entries(req.body.values)][i][0], req.body.exam_id, req.body.username,
            ], (err, results) => {
              // console.log('成功');
            })
          }
        }
      }
    })
    if (results.affectedRows === 0) return res.cc('新增试题失败')
    console.log(req.body.values);
    res.cc('新增成功', 0)
  })
}

exports.garde = (req, res) => {
  const sql = `SELECT question.exam_id,question.question_id,question.question_answer,user_answer.* FROM question INNER JOIN user_answer ON question.exam_id = user_answer.exam_id AND question.question_id = user_answer.answer_id WHERE username = ? And user_answer.exam_id = ?`
  db.query(sql, [req.body.username, req.body.exam_id], (err, results) => {
    console.log(results);
    if (err) return res.cc(err)
    // console.log(results[0].question_answer);
    // console.log(results[0].answer);
    var count = 0;
    for (var i = 0; i < results.length; i++) {
      if (results[i].question_answer === results[i].answer) {
        count++;
      } else {
        const sql = `INSERT INTO errquestion SET username = ?,answer_id = ?,exam_id = ?, answer = ?`
        db.query(sql, [results[i].username, results[i].answer_id, results[i].exam_id, results[i].answer], (err, results) => {
          console.log('添加错题成功');
        })
      }
    }
    var garde = (100 / (results.length) * 1) * (count * 1);
    res.send({
      status: 0,
      message: '阅卷成功',
      countquestion: results.length,
      corquestion: count,
      garde: garde,
    })
  })
}

// exports.adderror = (req, res) = {

// }

exports.search = (req, res) => {
  const sql = `select * from exam where exam_name LIKE '%${req.body.value}%' or exam_type_classify LIKE '%${req.body.value}%' `
  db.query(sql, (err, results) => {
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

exports.examresult = (req, res) => {
  const sql = `SELECT user_answer.* ,question.question_answer,question.question_option_A,question.question_option_B,question.question_option_C,question.question_option_D FROM user_answer INNER JOIN question ON user_answer.exam_id = question.exam_id AND user_answer.answer_id = question.question_id WHERE username = ? AND user_answer.exam_id = ? `
  db.query(sql, [req.body.username, req.body.exam_id], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取错题成功',
      data: results,
    })
  })
}