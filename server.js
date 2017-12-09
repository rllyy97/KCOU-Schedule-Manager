var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejs = require('ejs');

//var Q = require('Q');
var connection = mysql.createConnection({
  host : 'localhost',
  user: 'kcouDB',
  password: 'kcou321!',
  database: "kcou"
});
connection.connect();

app.use(bodyParser.urlencoded({
  extended: true
}));

/*Enables us to take requests in JSON format */
app.use(bodyParser.json());

app.set('view engine', 'ejs');


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
//  connection.connect()
  connection.query('SELECT * FROM hosts', function(err, results){
    if (err){
      console.log(err)
    }
    console.log("Database connected");
    console.log(results[0].first_name);
  });

//  connection.end();

  res.send('Database did stuff');

});

app.get('/getShows', function(req, res){
//  connection.connect()
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
})

app.get('/getPage/:id', function(req, res){
  var id = req.params.id;
  query = "SELECT * FROM shows where id=" + id;
  console.log(id);
  var title;
  var weekday;
  var descrip;
  var start;
  var end;

  connection.query(query, function(err, results){
    if (err){
      console.log(err)
    }
    else{
      query2 = "SELECT * FROM hosts where show_id=" +id;
      title = results[0].title;
      weekday = results[0].weekday;
      descrip = results[0].description;
      start = results[0].start_time;
      end = results[0].end_time;
      hosts = [];
      connection.query(query2, function(err, results){
        if (err){
          console.log(err);
        }
        else {
          console.log(results);
          var len = results.length;
          for (var i = 0; i < len; i++){
            console.log(i);
            host = {
              first_name: results[i].first_name,
              last_name: results[i].last_name,
              dj_name: results[i].dj_name
            }
            hosts.push(host);
          }
          editing = '/editShow/' + id;
          console.log(editing);
          res.render('showPage', {
            title: title,
            weekday: weekday,
            start_time: start,
            end_time: end,
            description: descrip,
            hosts: hosts,
            editLink: editing,
            id: id
          });
        }
      });
    }
  });

})

app.get('/editShow/:id', function(req, res){
  var id = req.params.id;
  query = "SELECT * FROM shows where id=" + id;
  var title;
  var changeLink ='/makeChange/' + id;
  connection.query(query, function(err, results){
    if (err){
      console.log(err)
    }
    else{
      title = results[0].title;
      res.render('editingAShow', {
        title: title,
        changeLink: changeLink
      });
      }
    });
})

app.post('/makeChange/:id', function(req, res){
  var desc = req.body.description;
  var id = req.params.id;
  query = "UPDATE shows SET description=" + connection.escape(desc) +" WHERE id=" +id;
  connection.query(query, function(err, results){
    if (err){
      console.log(err);
    }
    else{
      res.sendFile(__dirname + '/index.html');
    }
  })
})

app.post('/removeShow/:id', function(req, res){
  var id = req.params.id;
  query = "DELETE FROM shows where id=" + id;
  connection.query(query, function(err, results){
    if (err){
      console.log(err);
    }
    else {
      res.render('index');
    }
  })
});

app.post('/addShow', function(req, res){
//  connection.connect()
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
  var tooAdd = "( " + connection.escape(title) + ", "  + connection.escape(category) + ", '" + start_time + "', '" + end_time + "', " + connection.escape(description) + ", '" + weekday + "')";
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
      console.log(title);
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
  //              connection.end();

              }
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
