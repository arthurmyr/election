
module.exports = function(app, data){
  var mysql = app.drivers.mysql;

  this.id = data.id;
  this.elector_id = data.elector_id;
  this.candidate_id = data.candidate_id;
  this.table = 'votes';

  this.create = function(cb){
    var query = 'INSERT INTO '+this.table+' (elector_id, candidate_id) VALUES ('+this.elector_id+', '
                                                                 +this.candidate_id+')';
    mysql.query(query, function(err, rows, fields){
      cb(err, rows, fields);
    });
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

  this.getDataForChart = function(cb){
    var query = 'SELECT candidates.firstname, \
                      candidates.lastname, \
                      COUNT(*) as votes \
                 FROM votes \
                 LEFT JOIN candidates \
                 ON votes.candidate_id = candidates.id \
                 GROUP BY votes.candidate_id';

    mysql.query(query, function(err, rows, fields){
      cb(err, rows, fields);
    })
  }

  return this;
}
