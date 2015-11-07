var fs = require('fs');
var express = require('express');
var app = express();
app.use(express.static('../build'))

var mongojs = require('mongojs');

var db = mongojs('test', ['class', 'student']);

app.get('/view/:viewType/:dataType/:id', function(req, res){
  res.send(fs.readFileSync('../build/index.html', 'utf8'));
});

app.get('/sample', function(req, res){
  res.send({
    studentName:'Jonnie',
    age:13
  });
});

app.get('/data/:type/:id', function(req, res){
  if(req.params.type === 'class') {
    db.class.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, classDoc){
      if(err)
        throw new Error('Error finding class');
      db.student.find({class:req.params.id}, function(err, students){
        res.send({
          class:classDoc,
          students:students
        });
      });
    });
  } else if(req.params.type === 'student') {
    db.student.find({_id:mongojs.ObjectId(req.params.id)}, function(err, student){
      res.send(student);
    });
  }
});


app.listen(1337);
