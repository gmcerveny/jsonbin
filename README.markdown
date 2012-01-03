# JSON BIN

A RESTful webservice to set and retrieve JSON.

## USAGE

$ curl -X POST http://jsonbin.herokuapp.com/

access at http://jsonbin.herokuapp.com/abf052c9

$ curl -X PUT -d "oops=there goes my skirt" http://jsonbin.herokuapp.com/abf052c9

{"oops":"there goes my skirt"}

$ curl http://jsonbin.herokuapp.com/abf052c9

{"oops":"there goes my skirt"}