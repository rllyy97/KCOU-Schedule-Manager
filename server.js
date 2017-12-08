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

app.set('vier engine', 'ejs');


/*Basic routing for dynamic javascript*/
app.use('/js', express.static(__dirname + '/static/assets/js/'));

//Will serve our index.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/add', function(req, res){
  res.sendFile(__dirname + '/editPage.html');
});



app.get('/dbtest', function(req, res){
  connection.connect()
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
    var len = results.length;
    for (i = 0; i < len; i++){
      console.log("Row returned: " + i);
      console.log(results[i]);
    }

    res.status(200).json(results);


  });
  connection.end();

})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
