# JSON BIN

A RESTful webservice to set and retrieve JSON.

## USAGE

Create a bin

	$ curl -X POST http://jsonbin.herokuapp.com/
	access at http://jsonbin.herokuapp.com/abf052c9
	
Set content

	$ curl -X PUT -d "oops=there goes my skirt" http://jsonbin.herokuapp.com/abf052c9
	{"oops":"there goes my skirt"}

Retrieve bin

	$ curl http://jsonbin.herokuapp.com/abf052c9
	{"oops":"there goes my skirt"}