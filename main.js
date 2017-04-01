var express = require('express');
var app = express();

app.use(express.static('.'));

/*app.get('/', function (req, res) {
	res.send('Hello World');
})*/

app.get('/',function(req,res) {
        res.sendFile("html/index.html",{"root":__dirname});
})


  
var server = app.listen(8081, function () {
      var host = server.address().address
     var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
})

