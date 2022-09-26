const {
  request
} = require('express')
const db = require('../db/index')

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

exports.question = (req, res) => {
  const sql = `SELECT exam.exam_name , question.*  FROM exam INNER JOIN question ON exam.exam_id = question.exam_id where question.exam_id = ?`
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
    res.cc('新增成功', 0)
  })
}

exports.garde = (req, res) => {
  const sql = `SELECT question.exam_id,question.question_id,question.question_answer,user_answer.* FROM question INNER JOIN user_answer ON question.exam_id = user_answer.exam_id AND question.question_id = user_answer.answer_id WHERE username = ? And user_answer.exam_id = ?`
  db.query(sql, [req.body.username, req.body.exam_id], (err, results) => {
    if (err) return res.cc(err)
    // console.log(results[0].question_answer);
    // console.log(results[0].answer);
    var count = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[i].question_answer === results[i].answer) {
        count++;
      } else {
        const sql1 = `select * from errquestion where username = ? and answer_id = ? and exam_id = ?`
        db.query(sql1, [results[i].username, results[i].answer_id, results[i].exam_id], (err, result) => {
          if (result.length === 0) {
            const sql = `INSERT INTO errquestion SET username = ?,answer_id = ?,exam_id = ?`
            // console.log(results);
            db.query(sql, [results[i].username, results[i].answer_id, results[i].exam_id], (err, result1) => {

            })
          } else {

          }
        })
      }
    }
    var garde = Math.ceil((100 / (results.length) * 1) * (count * 1));
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
  const sql = `SELECT user_answer.* ,question.question_body,question.question_answer,question.question_option_A,question.question_option_B,question.question_option_C,question.question_option_D FROM user_answer INNER JOIN question ON user_answer.exam_id = question.exam_id AND user_answer.answer_id = question.question_id WHERE username = ? AND user_answer.exam_id = ? `
  db.query(sql, [req.body.username, req.body.exam_id], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取错题成功',
      data: results,
    })
  })
}

exports.errexam = (req, res) => {
  const sql = `SELECT DISTINCT username,question_answer,question_option_A,question_option_B,question_option_C,question_option_D,question_body,exam_name,exam_type,exam_type_classify FROM question INNER JOIN errquestion ON errquestion.exam_id = question.exam_id INNER JOIN exam ON exam.exam_id = question.exam_id where username = ?`
  db.query(sql, req.body.username, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取错题成功',
      data: results,
    })
  })
}

exports.addquestion = (req, res) => {
  const examInfo = {
    ...req.body,
  }
  const sql = `select * from exam`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    const sql = `INSERT INTO exam SET exam_type = ?,exam_name = ?,exam_type_classify = ?`
    db.query(sql, [examInfo.exam_type, examInfo.values.title, examInfo.exam_type_classify], (err, results) => {
      if (err) return res.cc(err)
      const sql = `select * from exam where exam_name = ?`
      db.query(sql, [examInfo.values.title], (err, results) => {
        if (err) return res.cc(err)
        const sql = `select * from question where exam_id = ?`
        db.query(sql, results[0].exam_id, (err, result) => {
          if (err) return res.cc(err)
          for (let i = 0; i < examInfo.values.exam.length; i++) {
            let a = i + 1;
            const sql = `insert into question set exam_id = ?, question_id = ?,question_body = ?,question_option_A = ?,question_option_B = ?,question_option_C = ?,question_option_D = ?,question_answer = ?`
            db.query(sql, [results[0].exam_id, a, examInfo.values.exam[i].question, examInfo.values.exam[i].A, examInfo.values.exam[i].B, examInfo.values.exam[i].C, examInfo.values.exam[i].D, examInfo.values.exam[i].answer], (err, results) => {
              if (err) return res.cc(err)
            })
          }
        })
      })
    })
  })
  res.send({
    status: 0,
    message: '添加成功',
  })
}

exports.updateexam = (req, res) => {
  const examInfo = {
    exam_name: req.body.values.title,
  }
  const sql = `update exam set ? where exam_id = ?`
  db.query(sql, [examInfo, req.body.exam_id], (err, results) => {
    if (err) return res.cc(err)
    for (let i = 1; i < req.body.values.exam.length; i++) {
      const exam1Info = {
        question_body: req.body.values.exam[i].name,
        question_option_A: req.body.values.exam[i].A,
        question_option_B: req.body.values.exam[i].B,
        question_option_C: req.body.values.exam[i].C,
        question_option_D: req.body.values.exam[i].D,
        question_answer: req.body.values.exam[i].answer,
      }
      const sql = `update question set ? where exam_id = ? And question_id = ?`
      db.query(sql, [exam1Info, req.body.exam_id, i], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows === 0) return res.cc('更新试题失败！')
      })
    }
  })
  res.send({
    status: 0,
    message: '更新成功',
  })
}