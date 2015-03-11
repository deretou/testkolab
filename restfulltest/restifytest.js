/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
    
    // Make a new Express app
var app = module.exports = express();

// Connect to mongodb
mongoose.connect('mongodb://kolabNX:eV30N.lmDXWzlVZydUwEVIGO6k7Dq0nSO48LwnVS1SM-@ds031088.mongolab.com:31088/kolabNX');

// Use middleware to parse POST data and use custom HTTP methods
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var hashPassword = function(req, res, next) {
  if (!req.body.password)
    return next({ status: 400, err: "No password!" }); // We can also throw an error from a before route
  req.body.password = bcrypt.hashSync(req.body.password, 10); // Using bcrypt
  return next(); // Call the handler
}

var sendEmail = function(req, res, next) {
  // We can get the user from res.bundle and status code from res.status and 
  // trigger an error by calling next(err) or populate information that would otherwise be miggins
  console.log(res);
  next(); // I'll just pass though
}

var User = restful.model( "users2", mongoose.Schema({
    username: 'string',
    password_hash: 'string',
  }))
  .methods(['get', 'put', 'delete', {
    method: 'post',
    before: hashPassword, // Before we make run the default POST to create a user, we want to hash the password (implementation omitted)
    after: sendEmail, // After we register them, we will send them a confirmation email
  }]);

User.register(app, '/user'); // Register the user model at the localhost:3000/user

app.listen(4242);