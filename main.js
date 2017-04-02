var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended: true});
app.use(urlParser);
app.use(jsonParser);
app.use(express.static('.'));

var mongoose = require('mongoose');
//var options = {server:{socketOptions:{keepAlive:300000,connectTimeoutMS:30000}},
//       replset:{socketOptions:{keepAlive:300000,connectTimeoutMS:30000}}};
mongoose.Promise = global.Promise;
var mongodbUri = 'mongodb://mylipdb:myl1pdb!lahacks@ds060649.mlab.com:60649/mylipdb';
mongoose.connect(mongodbUri);//,options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {

    });

var colors = ['red','orange','pink','purple','dark','nude'];
var lipstick = {type: String, enum: colors};
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var ProfileInfo = new Schema ({
	username:String,
	password:String,
	email: String,
	lipsOwned:[lipstick]
    });

var ProfModel = mongoose.model('ProfileModel', ProfileInfo);

module.exports = ProfModel;

app.get('/',function(req,res) {
        res.sendFile("html/index.html",{"root":__dirname});
});

app.get('/login',function(req,res) {
        res.sendFile("html/login.html",{"root":__dirname});
    });

app.get('/signup',function(req,res) {
	res.sendFile("html/signup.html",{"root":__dirname});
    });

app.get('/home',function(req,res) {
	res.sendFile("html/home.html",{"root":__dirname});
    });

app.get('/home-nudes',function(req,res) {
	res.sendFile("html/home-nudes.html",{"root":__dirname});
    });

app.get('/home-pinks',function(req,res) {
	res.sendFile("html/home-pinks.html",{"root":__dirname});
    });

app.get('/mirror',function(req,res) {
	res.sendFile("html/mirror.html",{"root":__dirname});
    });

app.post('/login',function(req,res) {
	//var data = req.body;
	res.send('Not implemented yet');
    });
  
app.post('/signup',jsonParser,function(req,res) {
	var data = req.body;
        var newUser = new ProfModel({
	    username:data.username,
	    password:data.password,
	    email:data.email
	    });
        //ProfModel.insert(newUser);
	//console.log(res);
	newUser.save(function (err) { if(err) console.log('Save error');});
	//res.end(JSON.stringify(res));
	/*myModel.create({username: data.username, password: data.password},function(err,instance) {
		if(err) return console.log(err);
		});*/
	//res.redirect('http://127.0.0.1:8081'+req.url);
	res.redirect('/home');
	//res.sendFile("html/home.html",{"root":__dirname});
    });

var server = app.listen(8081, function () {
     var host = server.address().address
     var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
});

