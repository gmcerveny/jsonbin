PORT = 8000;

var http = require ('http');
var url = require('url');

var message = '{"message":"Hello World"}';

var s = http.createServer(function(request, response){ 
	var urlParts = url.parse(request.url);
	var urlAction = urlParts.pathname.substr(1,3);

	if (urlAction == 'set') {
		var urlValue = urlParts.pathname.substr(5);
		message = unescape(urlValue);
	}
	
	response.writeHead(200, { 'content-type' : 'text/plain' });
	response.end(message);
});

s.listen(process.env.PORT || PORT);