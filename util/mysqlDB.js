const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.mysqlDB_PASSWORD,
    database: 'riddleDB'
},{multipleStatements: true});

exports.connectToMySQL= (callback) => {
    db.connect(err => {
        if(!err) {
            console.log('Connected to mySQL') ;
            callback();
        } else {
            console.log(err)
        }
    })
}


exports.getDB = () => {
    if (db) {
      return db;
    } else {
      throw err;
    }
  };