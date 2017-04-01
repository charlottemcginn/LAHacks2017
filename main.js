var express = require('express');
var app = express();
var mongoose = require('mongoose');

//var options = {server:{socketOptions:{keepAlive:300000,connectTimeoutMS:30000} },
//       replset:{socketOptions:{keepAlive:300000,connectTimeoutMS:30000} } };

var mongodbUri = 'mongodb://mylipdb:myl1pdb!lahacks@ds060649.mlab.com:60649/mylipdb';//mylip:myl1pdb!:8081/db';

mongoose.connect(mongodbUri);//, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {

    });

app.use(express.static('.'));

/*app.get('/', function (req, res) {
	res.send('Hello World');
})*/

app.get('/',function(req,res) {
        res.sendFile("html/index.html",{"root":__dirname});
});

app.get('/login',function(req,res) {
        //console.log(req.body);
	//res.send('Login');
        res.sendFile("html/login.html",{"root":__dirname});
    });

app.get('/signup',function(req,res) {
	res.sendFile("html/signup.html",{"root":__dirname});
    });

app.post('/login',function(req,res) {
	var data = req.body;
    });
  
var server = app.listen(8081, function () {
      var host = server.address().address
     var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
});

