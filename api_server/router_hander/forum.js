const db = require("../db/index");

exports.addforum = (req, res) => {
  const forumInfo = {
    ...req.body,
    date: new Date(),
  };
  const sql = `select * from forum `;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    const sql = `insert into forum set?`;
    db.query(sql, forumInfo, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return results.cc("新增帖子失败");
      res.cc("新增帖子成功", 0);
    });
  });
  console.log(req.body);
};

exports.getPage = (req, res) => {
  const sql = `select * from forum where forum_id order by date DESC`;
  db.query(sql, (err, results) => {
    function timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }
    for (let i = 0; i <= results.length - 1; i++) {
      var timestamp = results[i].date.getTime();
      time = timestampToTime(timestamp);
      results[i].date = time;
    }
    if (err) return res.cc(err);
    let current = Number(req.query.current);
    let pageSize = 10;
    let sumpage = Math.ceil(results.length / pageSize);
    if (current == "") {
      let data = results.splice(0, pageSize);
      res.send({
        sumpage: sumpage,
        status: 0,
        message: "获取分页成功",
        data: data,
        total: results.length,
      });
    } else {
      const total = results.length;
      let data = results.splice((current - 1) * pageSize, pageSize);
      res.send({
        sumpage: sumpage,
        message: "获取分页成功",
        data: data,
        total,
      });
    }
  });
};

exports.getforum = (req, res) => {
  const sql = `SELECT ev_users.* ,forum.* FROM ev_users INNER JOIN forum ON ev_users.username = forum.username where forum.forum_id = ?`;
  db.query(sql, req.body.forum_id, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "获取帖子数据成功",
      data: results[0],
    });
  });
};

exports.addcomment = (req, res) => {
  const commentInfo = {
    ...req.body,
    date: new Date(),
  };
  const sql = `SELECT ev_users.* ,forum_comment.* FROM ev_users INNER JOIN forum_comment ON ev_users.username = forum_comment.username where forum_comment.forum_id = ?`;
  db.query(sql, req.body.forum_id, (err, results) => {
    if (err) return res.cc(err);
    const sql = `insert into forum_comment set ?`;
    db.query(sql, commentInfo, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("新增失败");
      res.send({
        status: 0,
        message: "留言成功",
        data: commentInfo,
      });
    });
  });
};

exports.getPage1 = (req, res) => {
  const sql = `SELECT ev_users.* ,forum_comment.* FROM ev_users INNER JOIN forum_comment ON ev_users.username = forum_comment.username where forum_comment.forum_id = ?`;
  db.query(sql, req.query.forum_id, (err, results) => {
    if (err) return res.cc(err);
    let current = Number(req.query.current);
    let pageSize = 10;
    let sumpage = Math.ceil(results.length / pageSize);
    if (current == "") {
      let data = results.splice(0, pageSize);
      res.send({
        sumpage: sumpage,
        status: 0,
        message: "获取分页成功",
        data: data,
        total: results.length,
      });
    } else {
      const total = results.length;
      let data = results.splice((current - 1) * pageSize, pageSize);
      res.send({
        sumpage: sumpage,
        message: "获取分页成功",
        data: data,
        total,
      });
    }
  });
};
