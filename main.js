var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('.'));

var mongoose = require('mongoose');

var mongodbUri = 'mongodb://mylipdb:myl1pdb!lahacks@ds060649.mlab.com:60649/mylipdb';
mongoose.connect(mongodbUri);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {

    });

var colors = ['red','orange','pink','purple','dark','nude'];
var lipstick = {type: String, enum: colors};
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var ProfileInfo = new Schema ({
	username:ObjectId,
	password:String,
	email: String,
	lipsOwned:[lipstick]
    });

var myModel = mongoose.model('ProfileModel', ProfileInfo);

app.get('/',function(req,res) {
        res.sendFile("html/index.html",{"root":__dirname});
});

app.get('/login',function(req,res) {
        res.sendFile("html/login.html",{"root":__dirname});
    });

app.get('/signup',function(req,res) {
	res.sendFile("html/signup.html",{"root":__dirname});
    });

app.post('/login',function(req,res) {
	//var data = req.body;
	res.send('Not implemented yet');
    });
  
app.post('/signup',bodyParser,function(req,res) {
	/*var data = req.body;
        res = {
	    username:data.username,
	    password:data.password,
	    email:data.email
	};
	console.log(res);*/
	res.send('Done');//JSON.stringify(res));
	/*myModel.create({username: data.username, password: data.password},function(err,instance) {
		if(err) return handleError(err);
		});*/
	//res.send('Account Created');
    });

var server = app.listen(8081, function () {
     var host = server.address().address
     var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
});

