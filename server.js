var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './static')));


app.set('views' ,path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index');
});


var server = app.listen(8000, function(){
	console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.on('posting_form', function(data){
		var form_message = 'You emitted the following information to the server : { name: ' + data.name + ', location: ' + data.location + ', language: ' + data.language + ', comment: ' + data.comment + ' }';
		socket.emit('updated_message', { message : form_message });
		var random_num = Math.floor(Math.random() * (1000 - 1) + 1);
		var num_message = "Your lucky number emitted by the server is " + random_num + ".";
		socket.emit('random_number', { random : num_message});
	});
});