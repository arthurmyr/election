mysql = require('mysql');

module.exports = {
  connection: function(){
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'test',
      database: 'election'
    })
  },
  query: function(q, cb){
    var db = this.connection();
    db.connect();
    db.query(q, function(err, rows, fields){
      cb(err, rows, fields);
    });
    db.end();
  }
}
