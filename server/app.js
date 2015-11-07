var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('../build'))


app.get('/', function(req, res){
  fs.createReadStream('../build/index.html').pipe(res);
});

app.listen(1337);
