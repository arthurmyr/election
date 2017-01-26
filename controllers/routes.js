var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');



module.exports = function(app){
  var server = app.drivers.express.server,
  mysql = app.drivers.mysql;

  server.use('/', express.static(path.resolve('views/assets')));
  server.use(bodyParser.urlencoded({ extended: false }));

  // Site Routes
  server
  .get('/vote', function(req, res){
    res.sendFile(path.resolve('views/vote.html'));
  })
  .get('/signup', function(req, res){
    res.sendFile(path.resolve('views/signup.html'));
  })
  .get('/chart', function(req, res){
    res.sendFile(path.resolve('views/chart.html'));
  });

  // API Routes
  server
  .get('/api/electors', function(req, res){
    if(req.query.id === undefined){
      var elector = new app.models.elector(app, {});
      elector.getAll(function(err, rows, fields){
        if(err) res.status(500).send(err);
        res.status(200).send({data: rows, status:'sucess'});
      });
    }
    else{
      var elector = new app.models.elector(app, {id: req.query.id});
      elector.get(function(err, rows, fields){
        if(err) res.status(500).send(err);
        res.status(200).send({data: rows, status:'sucess'});
      });
    }
  })
  .get('/api/candidates', function(req, res){
    var candidate = new app.models.candidate(app, {})
    candidate.getAll(function(err, rows, fields){
      if(err) res.status(500).send(err);
      res.status(200).send({data: rows, status:'sucess'});
    });
  })
  .get('/api/votes', function(req, res){
    var vote = new app.models.vote(app, {});
    vote.getDataForChart(function(err, rows, fields){
      if(err) res.status(500).send(err);
      res.status(200).send({data: rows, status:'sucess'});
    })
  })
  .post('/api/electors', function(req, res){
    var elector = new app.models.elector(app, {
      id : req.body.id,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      adress: req.body.adress,
      ip: req.connection.remoteAddress
    });
    elector.create(function(err, rows, fields){
      if(err) res.status(500).send(err);
      res.status(201).send({status:'sucess'});
    });
  })
  .post('/api/votes', function(req, res){
    var vote = new app.models.vote(app, {
      elector_id: req.body.elector_id,
      candidate_id: req.body.candidate_id
    });
    vote.create(function(err, rows, fields){
      if(err) res.status(500).send(err);
      res.status(201).send({status:'sucess'});
    });
  });

  // 404 Redirect
  server
  .use(function(req, res){
    res.redirect('/signup');
  });
}
