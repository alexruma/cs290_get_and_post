var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();

//Handlebars engine.
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//POST request body parse.
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//HTML engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('port', 6923);

app.get('/',function(req,res){
    res.type('text/plain');
    res.send('Scooby Doo!');
  });

//Handle GET Requests
app.get('/request',function(req,res){
    var context = {};
    context.name = req.query.name;
    var queryParams = [];

    for (var param in req.query){
        let paramName = param[0].toString().toUpperCase() + param.toString().slice(1)    
        queryParams.push({'name': paramName, 'value': req.query[param]})
    }
    
    context.allParams = queryParams;

    res.render('get_request.handlebars', context);
  });
  
  //Handle POST Requests
  app.post('/request',function(req,res){
    var context = {};
    var bodyParams = [];

    //Handle GET body.
    for (var param in req.body){
        let paramName = param[0].toString().toUpperCase() + param.toString().slice(1)    
        bodyParams.push({'name': paramName, 'value': req.body[param]})
    }
    context.allParams = bodyParams;

    //Handle GET
    var queryParams = [];

    for (var param in req.query){
        let paramName = param[0].toString().toUpperCase() + param.toString().slice(1)    
        queryParams.push({'name': paramName, 'value': req.query[param]})
    }
    
    context.getParams = queryParams;

    console.log(req.body)
    res.render('post_request.handlebars', context);
  });

app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
  });
  
  app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });