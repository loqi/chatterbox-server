var http = require('http');

var handler = require('./request-handler').handler;

var port = 3000;
var ip = '127.0.0.1';

var server = http.createServer(handler);

server.listen(port, ip);
console.log('Listening on http://' + ip + ':' + port);
