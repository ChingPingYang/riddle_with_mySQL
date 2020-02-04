const mysqlDB =require('../util/mysqlDB');

class Riddle {
  constructor(author, title, riddle, image_url, date) {
    this.title = title;
    this.author = author;
    this.riddle = riddle;
    this.likes = 0;
    this.image_url = image_url;
  }

  saveRiddle() {
    let sql = `INSERT INTO riddles SET ?`;
    mysqlDB.getDB().query(sql, this, (err, results)=> {
      if(err) throw err;
    });
  }

  static getAll() {
    let sql = 'SELECT * FROM riddles'
    return new Promise((resolve, reject) => {
      mysqlDB.getDB().query(sql, (err, results, fields) => {
        
        resolve(results);
      })
    })
  }

  static getOne(riddleId) {
    let sql = `SELECT * FROM riddles WHERE _id = ${riddleId}`;
    return new Promise((resolve, reject) => {
      mysqlDB.getDB().query(sql, (err, results) => {
        resolve(results[0]);
      })
    })
  }

  static deleteRiddle(id) {
    let sql = `DELETE FROM riddles WHERE _id = ${id}`;
    mysqlDB.getDB().query(sql, (err, results) => {if(err) throw err});
  }

  // static updateRiddle(id, title, content) {
  //   return database.getDB().collection('riddles')
  //     .updateOne({_id: new mongodb.ObjectId(id)}, {$set: {title: title, content: content}});
  // }

  static async like(id) {
    let sql = `SELECT likes FROM riddles WHERE _id = ${id};`;
    mysqlDB.getDB().query(sql, (err, results) => {
      let currentLike = results[0].likes;
      console.log(currentLike);
      let sql = `UPDATE riddles SET likes = ${++currentLike} WHERE _id = ${id}`;
      mysqlDB.getDB().query(sql, (err, results) => {
        if(err) throw err;
      });
    });
  }
}

module.exports = Riddle;