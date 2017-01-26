
module.exports = function(app, data){
  var mysql = app.drivers.mysql;

  this.id = data.id;
  this.firstname = data.firstname;
  this.lastname = data.lastname;
  this.age = data.age;
  this.party = data.party;
  this.picture = data.picture;
  this.table = 'candidates';

  this.get = function(cb){
    var query = 'SELECT * FROM '+this.table+' WHERE id='+this.id;
    mysql.query(query, function(err, rows, fields){
      cb(err, rows, fields);
    });
  }

  this.getAll = function(cb){
    var query = 'SELECT * FROM '+this.table;
    mysql.query(query, function(err, rows, fields){
      cb(err, rows, fields);
    });
  }

  return this;
}
