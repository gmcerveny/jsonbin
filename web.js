PORT = 5000;

var http = require ('http');
var url = require('url');
var querystring = require('querystring');

var bins = [];
var emptyBin = {
		'key': '',
		'date': '',
		'data': '{ "message" : "no bin found" }'
	};

// indexOfBin() could be used for this test, just trying out different class functions
var validKey = function(key) {
	return !bins.some( 
		function (bin) { return bin.key == key;}
	);
}

var indexOfBin = function (key) {
	for ( var i = 0; i < bins.length; i++) {
		if (bins[i].key == key)
			return i;
	}
	return -1;
}

var generateKey = function() {
	var max = Math.pow(16,8);
	var min = Math.pow(16,7);
	var keyNumber = Math.floor(Math.random() * (max - min )) + min;
	var keyHex = keyNumber.toString(16);
	
	if ( validKey(keyHex) )
		return keyHex;
	else
		return generateKey();
}

var addBin = function(data) {
	if (!data)
		data = '';	
	var newBin = {	
		'key': generateKey(), 
		'date': Date.now(), 
		'data': data
	};
	bins.push(newBin);
	return newBin;
}

var getBin = function (key) {
	var i = indexOfBin(key);
	if ( i > -1 )
		return bins[i];
	else
		return emptyBin;
}

var respond = function(response, message){
	response.writeHead(200, { 'content-type' : 'text/plain' });
	response.end(message + '\n');
}

var s = http.createServer();

s.on('request', function(request, response){ 
	var message;
	var urlParts = url.parse(request.url);
	
	console.log(request.method);
	switch (request.method) {
		case "POST":
			var bin = addBin();
			message = "access at http://jsonbin.herokuapp.com/" + bin.key;
			respond(response, message);
			break;
		case "PUT":
			var key = urlParts.pathname.substr(1);
			var bin = getBin(key);

			if (bin == emptyBin) {
				message = bin.data;
				respond(response, message);
				break;
			}
			
			var data = '';
			request.on('data', function(chunk) {
				data += chunk;
			});
			request.on('end', function() {
				var post = querystring.parse(data);
				bin.data = JSON.stringify(post);
				message = bin.data;
				respond(response, message);
			});
			break;
		case "GET":
			if (urlParts.pathname == "/all") {
				message = 'All\n';
				bins.forEach( function(bin) {
				message += 'key: ' + bin.key + '\n' + 'data: ' + bin.data + '\n\n';
				});
				respond(response, message);
				break;
			}
				
			var key = urlParts.pathname.substr(1);
			var bin = getBin(key);
			message = bin.data;
			respond(response, message);
			break;		
		default:
			var message = "no action specified/n";
			respond(response, message);
			break;
	}
});

s.listen(process.env.PORT || PORT);