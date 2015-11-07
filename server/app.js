var fs = require('fs');
var express = require('express');
var app = express();
app.use(express.static('../build'))

app.get('/', function(req, res){
  res.send(fs.readFileSync('../build/index.html'));
});

app.get('/sample', function(req, res){
  res.send({
    studentName:'Jonnie',
    age:13
  });
});


app.listen(1337);
