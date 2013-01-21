/**
 * The ports used
 */
var ports = {
	http: 8000,
	tuioTCP: 8080,
	tuioUDP: 3333,
}

/**
 * HTTP Server
 */
var express = require('express'),
	app = express.createServer();
	

app.listen(ports.http);
app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
	res.sendfile('index.html');
	this.on('finish', function() { 
		req.socket.removeListener('error', error); 
	});
});

/**
 * TUIO Handling
 */
var tuio = require("tuio");

tuio.init({
	oscPort: ports.tuioUDP,
	oscHost: "0.0.0.0",
	socketPort: ports.tuioTCP
});

/**
 * General UDP Data Handling
 * 
 * For this to work you need to set up another socket on the client
 * that listens to port specified below
 */

 /*
var io = require('socket.io').listen(app);
var dgram = require("dgram");
var UDP = dgram.createSocket("udp4");

UDP.on("listening", function() {
	var address = UDP.address();
});

UDP.bind(5555);

io.set("log level", 0);
io.sockets.on("connection", function(socket) {
	UDP.on("message", function(msg) {
		socket.emit("message", msg.toString());
	});
});
*/


