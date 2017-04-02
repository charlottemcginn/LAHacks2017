const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({extended: true});
app.use(urlParser);
app.use(jsonParser);
app.use(express.static('.'));

var secret_key = 'n93874nc32jknksjav34o8743fjasdkvjoidfshjk';
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
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
	username:String,
	password:String,
	email: String,
	lipsOwned:[lipstick]
    });

var ProfModel = mongoose.model('ProfileModel', ProfileInfo);

module.exports = ProfModel;

app.use(session({
	    store: new MongoStore({
		    url: mongodbUri
			}),
	    secret: secret_key,
	    resave: false,
	    saveUninitialized: false
      }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username,password,done) {
	    ProfModel.findOne({username:username},function(err,user) {
		    if (err) {
			console.log(err);
			return done(err);
		    }
		    if (!user) {
			console.log(password);
			return done(null,false);
		    }
		    if (password != user.password) {
			console.log(password);
			console.log(user.password);
			return done(null,false);
		    }
		    return done(null,user);
		});
		}));

passport.serializeUser(function(user, cb) {
	console.log(user);
	cb(null, user.id);
    });

passport.deserializeUser(function(id, cb) {
	ProfModel.findOne({username:id}, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	    });
    });

app.get('/',function(req,res) {
        res.sendFile("html/index.html",{"root":__dirname});
});

app.get('/logout',function(req,res) {
        //delete req.session.user_id;
	req.logout();
	res.redirect('/');//("html/index.html",{"root":__dirname});
    });

app.get('/login',function(req,res) {
	res.sendFile("html/login.html",{"root":__dirname});
    });

//app.get('/user_profile', checkAuth, function(req,res) {
	

app.get('/signup',function(req,res) {
	res.sendFile("html/signup.html",{"root":__dirname});
    });

app.get('/home',/*require('connect-ensure-login').ensureLoggedIn(),/*passport.authenticate('local',{failureRedirect:'/login'}),*/function(req,res) {
	res.sendFile("html/home.html",{"root":__dirname});
	/*if ( req.session && req.session.user) {
	    ProfModel.findOne({username:req.session.user.username},function(err,user) {
		    if (!user) {
			req.session.reset();
			res.redirect('/login');
		    } else {
			res.locals.user = user;
		        res.sendFile("html/home.html",{"root":__dirname});
		    }
		});
	} else {
	    res.redirect('/login');
	    }*/
    });

app.get('/home-nudes',function(req,res) {
	res.sendFile("html/home-nudes.html",{"root":__dirname});
    });

app.get('/home-pinks',function(req,res) {
	res.sendFile("html/home-pinks.html",{"root":__dirname});
    });

app.get('/home-mirror',function(req,res) {
	res.sendFile("html/home-mirror.html",{"root":__dirname});
    });

app.get('/home-camera',function(req,res) {
	res.sendFile("html/home-camera.html",{"root":__dirname});
    });

app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),function(req,res) {
	/*var post = req.body;
	console.log(post.username);
	console.log(post.password);
	var check_user = ProfModel.findOne({username:post.username}, function(err,user) {
		if (err) {console.log('Login error');
		} else if (!user) {
		    res.send('Incorrect username or password');
		} else {
		    if (post.password == user.password) {
			req.session.user = user;
			res.redirect('/home');
		    } else {
			res.send('Incorrect username or password');
		    }
		}
		});*/
	console.log('was authenticated');
	res.redirect('/home');
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
	console.log(newUser.username);
	console.log(newUser.password);
	console.log(newUser.email);
	res.redirect('/login');
	//res.sendFile("html/home.html",{"root":__dirname});
    });

var server = app.listen(8081, function () {
     var host = server.address().address
     var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
});

