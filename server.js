var webpack = require('webpack');
var config = require('./webpack.config');
var express = require('express');
var mongoose = require('mongoose');
var stormpath = require('express-stormpath');
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

var Comment = require('./models/comments');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage});

app.use(bodyParser());

app.use(favicon(__dirname+'/src/favicon.ico'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(stormpath.init(app, {
  web: {
    produces: ['application/json']
  }
}));

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

app.post('/upload', upload.single('photo'), function(req, res, next){
  res.end();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dhingra_lab');

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});


router.use(bodyParser());

//adding the /comments route to our /api router
router.route('/comments')
  .get(function(req, res) {
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
    res.json(comments)
  });
  })
  .post(function(req, res) {
    console.log("Post api:"+req);
    var comment = new Comment();
    comment.title = req.body.title;
    comment.date = req.body.date;
    comment.content = req.body.content;
    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

app.use('/api', router);
 // app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {

//   function writeError(message) {
//     res.status(400);
//     res.json({ message: message, status: 400 });
//     res.end();
//   }

//   function saveAccount () {
//     req.user.givenName = req.body.givenName;
//     req.user.surname = req.body.surname;
//     req.user.email = req.body.email;

//     req.user.save(function (err) {
//       if (err) {
//         return writeError(err.userMessage || err.message);
//       }
//       res.end();
//     });
//   }

//   if (req.body.password) {
//     var application = req.app.get('stormpathApplication');

//     application.authenticateAccount({
//       username: req.user.username,
//       password: req.body.existingPassword
//     }, function (err) {
//       if (err) {
//         return writeError('The existing password that you entered was incorrect.');
//       }

//       req.user.password = req.body.password;

//       saveAccount();
//     });
//   } else {
//     saveAccount();
//   }
// });

app.get('/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/css/bootstrap.min.css'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.on('stormpath.ready', function () {

  app.listen(3000, 'localhost', function (err) {
    if (err) {
      return console.error(err);
    }
  console.log('Listening at http://localhost:3000'); 
  });
});

