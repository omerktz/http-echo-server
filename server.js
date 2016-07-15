var http = require('http');
var url = require('url');

var port = 8080;//process.env.PORT);

http.createServer(function(request,response){
  //console.log("got request");
  //console.log("\t"+"<body>"+unescape(url.parse(request.url, true).query["xss"])+"</body>");
  response.writeHead(200);
  response.write("<body>"+unescape(url.parse(request.url, true).query["xss"])+"</body>");
  response.end();
}).listen(port);
console.log("listening on port "+port);

/*
'use strict'

var server = require('net').createServer()

server.on('connection', function (c) {
  console.log('[server] event: connection')
  var gotData = false
  c.on('lookup', function (err, address, family) {
    console.log('[connection] event: lookup (address: %s, family: %s)', address, family)
    if (err) throw err
  })
  c.on('data', function (chunk) {
    console.log('[connection] event: data')
    console.log('--> ' + chunk.toString().split('\n').join('\n--> '))
    if (!gotData) {
      gotData = true
      c.write('HTTP/1.1 200 OK\n')
      c.write('Date: ' + (new Date()).toString() + '\n')
      c.write('Connection: close\n')
      c.write('Content-Type: text/html\n')
      //c.write('X-XSS-Protection: 0\n')
      c.write('\n')
      setTimeout(function () {
        c.end()
      }, 2000)
    }
    //c.write(chunk.toString())
    c.write('<html><div>'+chunk+'</div></html>')
  })
  c.on('end', function () {
    console.log('[connection] event: end')
  })
  c.on('timeout', function () {
    console.log('[connection] event: timeout')
  })
  c.on('drain', function () {
    console.log('[connection] event: drain')
  })
  c.on('error', function (err) {
    console.log('[connection] event: error')
    throw err
  })
  c.on('close', function () {
    console.log('[connection] event: close')
  })
})

server.on('listening', function () {
  var port = server.address().port
  console.log('[server] event: listening (port: %d)', port)
})

server.on('close', function () {
  console.log('[server] event: close')
})

server.on('error', function (err) {
  console.log('[server] event: error')
  throw err
})

server.listen(process.env.PORT)
*/