// const db = require('../db/index')

// exports.getExam = (req, res) => {
//   const sql = `select * from exam where is_delete = 0`
//   db.query(sql, (err, results) => {
//     if (err) return res.cc(err)
//     res.send({
//       status: 0,
//       message: '获取题库成功',
//       data: results,
//     })
//   })
// }