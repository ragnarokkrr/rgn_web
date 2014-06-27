/*
var connect = require('connect');


connect.createServer(
	connect.static("angularjs")

).listen(5000);
*/

var http = require("http");
var connect = require("connect");

var app = connect()
	.use(connect.logger('dev'))
	.use(connect.static('../angularjs'))
	.use(function(req, res){
		res.end('hello world\n');
	});
	
http.createServer(app).listen(3000);
