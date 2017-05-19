var webpack = require('webpack');
var config = require('./webpack.config');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var favicon = require('serve-favicon');
var app = express();
var compiler = webpack(config);
var multer = require('multer');
var request = require('request');
var router = express.Router();
var Promise = require('bluebird');
var fs = require('fs');
var express = require('express');
var app = express();

// your express configuration here



var Comment = require('./models/comments');
var User = require('./models/users');
var currentUser = "invalid";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage});

app.use(bodyParser({limit: '200mb'}));
app.use(favicon(__dirname+'/src/favicon.ico'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

//executing shell commands

app.get('/exec*', function (req,res) {
  console.log("Execute ls"+ req.user);
  console.log(req.query['command']);
  var  child = exec(req.query['command'], function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    res.send(JSON.stringify(stdout));
  });
});

//serving files to donwload
app.get('/download*', function (req,res) {
  console.log(__dirname+'/uploads/'+ req.query['filename']);
  res.download(path.join(__dirname+'/uploads/'+ req.query['filename']));
});

//storing uploaded files

app.post('/upload', upload.single('photo'), function(req, res, next){
  res.end();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dhingralab');

// mongo router 

app.use('/api', router);

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

router.route('/userlogin')
  .post(function(req, res) {
    User.findOne( {email: req.body.email}, function(err, user) {
      if (err)
        res.send(err);
      if( user.password === req.body.password) {
        
        currentUser = req.body.email;
      }
      console.log(currentUser+" logged in");
      res.send('success');    
    });
  });

router.route('/users')
  .post(function(req, res) {
    console.log(req.body.email);
    
    User.findOne( {email: req.body.email}, function(err, user) {
      if (err)
        res.send(err);
      if(user) {
         res.send(false);
      } else {
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(function(err) {
          if (err){
            console.log(err);
            res.send(err);
          }
          res.send(true);
        });    
      }    
    });  
  });
//router.use(bodyParser());

//adding the /comments route to our /api router
router.route('/comments')
  .get(function(req, res) {
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
    //console.log(comments);
    res.json(comments);    
    });
  })
  .post(function(req, res) {
    console.log("post"+req.body.content);
    var comment = new Comment();
    comment.title = req.body.title;
    comment.date = req.body.date;
    comment.content = req.body.content;
    comment.username = currentUser;
    comment.files = req.body.filename;
    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  })
  .delete(function(req, res) {
    //if(req.body.username ==  currentUser) {
      Comment.findByIdAndUpdate(req.body._id, {content: req.body.content}, function(err, comments) {
        if (err)
          console.log(err);
      });
  });


app.get('/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/css/bootstrap.min.css'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});


  app.listen( 3000, 'localhost', function (err) {
    if(err) {
      return console.error(err);
    }
    console.log('Listening at http://localhost:3000'); 
  });
