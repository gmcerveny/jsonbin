PORT = 8000;

var http = require ('http');

var s = http.createServer(function(req, res){ 
	res.writeHead(200, { 'content-type' : 'text/plain' });
	res.end("Hello world\n");
});

s.listen(process.env.PORT || PORT);