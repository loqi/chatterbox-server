var url = require('url');

var messages = require('./messages');

var messageRouter = {
  'POST' : messages.postMessage,
  'GET' : messages.getMessages,
  'OPTIONS': messages.sendOptionsResponse
}

exports.handler = function(request, response) {

  var path = url.parse(request.url).pathname;
  var method = request.method;

  if (path === '/classes/messages' && messageRouter[method]) {
    messageRouter[method](request, response);
  } else {
    messages.send404(request, response);
  }
};
