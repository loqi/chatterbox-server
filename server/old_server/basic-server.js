/* Import node's http module: */
var http = require("http");
var path = require("path");
var url = require("url");

var requestHandler = require("request-handler.js");

/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var port = 3000;

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "127.0.0.1";



/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */
var server = http.createServer(requestHandler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */




debugger;
    var requestParams = {
      method: 'POST',
      uri:    'http://127.0.0.1:3000/classes/messages',
      json:   { username: 'Jono', message: 'Do my bidding!' }
    };

// console.log('**** requestParams '+(typeof requestParams));
// console.log(JSON.stringify(requestParams));

debugger;
    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
debugger;

      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
debugger;
          var messages = JSON.parse(body).results;


// console.log('response=' + JSON.stringify(response));
// console.log('BODY '+ (typeof body)+'\n' + body);
// console.log('MESAGES \n' + JSON.stringify(messages));
// console.log('\n\n');


          // expect(messages[0].username).to.equal('Jono');
          // expect(messages[0].message).to.equal('Do my bidding!');
          // done();
        });
    });
