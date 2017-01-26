app = {}

app.drivers = {}
app.drivers.express = require('./drivers/express');
app.drivers.express.init();
app.drivers.mysql = require('./drivers/mysql');

app.models = {}
app.models.elector = require('./models/elector');
app.models.candidate = require('./models/candidate');
app.models.vote = require('./models/vote');

app.controllers = {}
app.controllers.routes = require('./controllers/routes')(app);
