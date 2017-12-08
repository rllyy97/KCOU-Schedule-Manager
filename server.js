var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql')
var connection = mysql.createConnection({
  host : 'localhost',
  user: 'kcouDB',
  password: 'kcou321!',
  database: "kcou"
});


app.use(bodyParser.urlencoded({
  extended: true
}));

/*Enables us to take requests in JSON format */
app.use(bodyParser.json());


/*Basic routing for dynamic javascript*/
app.use('/js', express.static(__dirname + '/static/assets/js/'));

//Will serve our index.
app.get('/', function(req, res){
  res.send('hello world');
});



app.get('/dbtest', function(req, res){
  connection.connect()
  console.log("Yooo");

  connection.query('SELECT * FROM hosts', function(err, results){
    if (err){
      console.log(err)
    }
    console.log("Database connected");
    console.log(results[0].first_name);
  });

  res.send('Database did stuff');

  connection.end();
});

app.get('/getShows', function(req, res){
  connection.connect()
  console.log("Fetching Shows");

  connection.query('SELECT * FROM shows', function(err, results){
    if (err){
      console.log(err)
    }
    console.log(results);
    for(info in results){
      console.log(info.title);
    }
  });

  res.send("Got shows");
  connection.end();

})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
