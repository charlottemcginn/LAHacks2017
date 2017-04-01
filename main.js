var express = require('express');
var app = express();

app.use(express.static('.'));

/*app.get('/', function (req, res) {
	res.send('Hello World');
})*/

app.get('/',function(req,res) {
        res.sendFile("html/index.html",{"root":__dirname});
});

/*function login_form () {
    var form = document.createElement('form');
    form.setAttribute('method','post');
    form.setAttribute('action','/login');
    form.style.display = 'hidden';
    document.body.appendChild(form);
    form.submit();
    }*/

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

