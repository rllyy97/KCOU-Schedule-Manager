var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql');
//var Q = require('Q');
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

app.use('/images', express.static(__dirname + '/static/assets/images/'));

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

//To Do
app.delete('/removeShow', function(req, res){

});

app.put('upDateShow', function(req, res){

});

app.post('/addShow', function(req, res){
  connection.connect()
  console.log("Adding  a Show")
  console.log(req.body);
  var title = req.body.title;
  var hosts = [];
  if (req.body.hostOneFirst != ''){
    host1 = {
      first: req.body.hostOneFirst,
      last: req.body.hostOneLast,
      dj: req.body.hostOneDJ
    }
    hosts.push(host1);
  }
  if (req.body.hostTwoFirst != ''){
    host2 = {
      first: req.body.hostTwoFirst,
      last: req.body.hostTwoLast,
      dj: req.body.hostTwoDJ
    }
    hosts.push(host2);
  }
  if (req.body.hostThreeFirst != ''){
    host3 = {
      first: req.body.hostThreeFirst,
      last: req.body.hostThreeLast,
      dj: req.body.hostThreeDJ
    }
    hosts.push(host3);
  }

  console.log(hosts);

  var category = req.body.category;
  var weekday = req.body.dayOfTheWeek;
  var start_time = req.body.startTime;
  var end_time = req.body.endtime;
  var description = req.body.description;

  console.log(hosts);


  var sql = "INSERT INTO shows (title, category, start_time, end_time, description, weekday) VALUES "
  var tooAdd = "( '" + title + "', '"  + category + "', '" + start_time + "', '" + end_time + "', '" + description + "', '" + weekday + "')";
  var totalQuery = sql + tooAdd;
  var k;
  console.log(totalQuery);
  connection.query(totalQuery, function(err, results){
    if (err){
      console.log(err)
    }
    else {
      console.log("Posted!");
      len = hosts.length
      title = "'"+title+"'"
        query = "SELECT * FROM shows WHERE title=" + title;
        connection.query(query, function(err, results){
          if(err){
            console.log(err);
          }
          else{
          k = results[0].id
          console.log(k);
          for (var i=0; i < len; i++){
                hostAdd = "INSERT INTO hosts (show_id, first_name, last_name, dj_name) VALUES "
                var tooAdd = "(" + k + ", '"  + hosts[i].first + "', '" + hosts[i].last + "', '" + hosts[i].dj + "')";
                var totalQ = hostAdd + tooAdd;
                connection.query(totalQ, function(err, results){
                  if(err){
                    console.log(err);
                  }
                  else{
                    console.log("Cool.");
                  }
                });
              }
          connection.end();
        }
        });
    }

  });
      console.log(k);
      console.log("Ended");
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
