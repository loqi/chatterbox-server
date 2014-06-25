/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var path = require('path');
var url = require('url');
var messageStore = {};
var validPaths = ['/classes', '/send']

exports.createMessage = function(user, msg, room) {
  var message = {
    username: user,
    text: msg,
    roomname: room
  };
  return message;
};

exports.packageResults = function(messageArray) {
  return JSON.stringify({ results: messageArray });
};

exports.getRoomName = function(request) {
  // if url is /classes/blah, then 'blah' is the room name
  var exRet = /^\/classes\/(.*)$/.exec(request.url);
  return exRet ? exRet[1] : '';
};

exports.getMessages = function(room) {
  if ((messageStore[room] === undefined) || (messageStore[room] === null)) {
    messageStore[room] = [];
  }
  return messageStore[room];
};

exports.addMessage = function(room, message) {
  var roomMessages = exports.getMessages(room);
  roomMessages.push(message);
};

exports.checkForAcceptedUrl = function(request) {
  for (var x=0; x<validPaths.length; x++) {
    if (request.url.indexOf(validPaths[x]) !== -1) {
      return true;
    }
  }
  return false;
}

exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  var reply = [];
  var statusCode = 404;

console.log('\n\n****************************************');
  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log("Request URL is " + request.url);

  if (exports.checkForAcceptedUrl(request)) {
    // POST & "/classes/someRoom" in URL, then adding a new chat message
    // GET & "/classes/someRoom" in URL, then retrieving a list of chat messages

console.log('\n****request tye: '+request.method);

    var room = exports.getRoomName(request);
    if (request.method === "GET") {
      reply = exports.getMessages(room);
      statusCode = 200;
    } else if (request.method === "POST") {

      //handlePost(request, response)
      statusCode = 201;
      var msg = "";
      request.on('data', function(data) {
        msg += data;
        if (msg.length > 1e6)
          request.connection.destroy();
      });

console.log('\n****room: '+JSON.stringify(room));
console.log('\n****msg: '+JSON.stringify(msg));

      if (msg.length > 0) {
        msg = JSON.parse(msg);
        exports.addMessage(room, msg);
        reply = exports.getMessages(room);
      }
    } else if (request.method === "OPTIONS") {
      statusCode = 200;
    }
  }


  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  headers["Content-Type"] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

  response.end(exports.packageResults(reply));
};


exports.handler = exports.handleRequest;

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
