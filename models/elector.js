
module.exports = function(app, data){
  var mysql = app.drivers.mysql;

  this.id = data.id;
  this.email = data.email;
  this.firstname = data.firstname;
  this.lastname = data.lastname;
  this.age = data.age;
  this.adress = data.adress;
  this.table = 'electors';

  this.create = function(cb){
    var query = "INSERT INTO "+this.table+" (email, firstname, lastname, age, adress, ip) VALUES ('"
                                                                              + this.email +"','"
                                                                              + this.firstname +"','"
                                                                              + this.lastname +"',"
                                                                              + this.age +",'"
                                                                              + this.adress +"','"
                                                                              + this.ip +"')";

    mysql.query(query, function(err, rows, fields){
      cb(err, rows, fields);
    })
  }

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
