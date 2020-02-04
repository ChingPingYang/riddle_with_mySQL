const mysqlDB = require('../util/mysqlDB');

class Comment {
  constructor(riddleId, author, comment, vote) {
    this.riddle_id = riddleId;
    this.author = author;
    this.comment = comment;
    this.vote = vote;
  }

  saveComment() {
    let sql = `INSERT INTO comments SET ?`;
    mysqlDB.getDB().query(sql, this, (err, results)=> {
      if(err) throw err;
    });
  }

  static getAllComment() {
    let sql = 'SELECT * FROM comments';
    return new Promise((resolve, reject) => {
      mysqlDB.getDB().query(sql, (err, results) => {
        resolve(results);
      })
    })
  }

  static getOneComment(commentId) {
    let sql = `SELECT * FROM comments WHERE _id = ${commentId}`;
    mysqlDB.getDB().query(sql, (err, results) => { if(err) throw err});
  }

  static deleteComment(id) {
    let sql = `DELETE FROM comments WHERE _id = ${id}`;
    mysqlDB.getDB().query(sql, (err, results) => {if(err) throw err});

  }

  static async deleteAllComment(riddleId) {
    let sql = `DELETE FROM comments WHERE riddle_id = ${riddleId}`;
    mysqlDB.getDB().query(sql, (err, results) => { if(err) throw err});
  }

  static updateComment(id, author, comment) {
    let sql = `UPDATE comments SET author = '${author}', comment = '${comment}' WHERE _id = ${id}`;
    mysqlDB.getDB().query(sql, (err, results) => { if(err) throw err});
  }

  static async voteComment(id, value) {
    let sql = `SELECT vote FROM comments WHERE _id = ${id};`
    mysqlDB.getDB().query(sql,(err, results) => {
        let currentVote = results[0].vote;
        let sql = `UPDATE comments SET vote = ${currentVote + value} WHERE _id = ${id}`;
        mysqlDB.getDB().query(sql, (err, results)=> { if(err) throw err});
    });
  }
}

module.exports = Comment;
