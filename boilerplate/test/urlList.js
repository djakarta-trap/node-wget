var fs = require('fs');

var argStr = ['-o', 'wget_log', '-c', '-x', '-np', '-A.html', '-k', '--level=0', 'dummyURL'];
var i = 0;

var spawn = require('child_process').spawn
var wget = null;
var url  = require('url')
var urls = [];

var _doWget = function(){
	console.log("url:" + urls[i]);
	argStr.pop();
	argStr.push(urls[i]);

	wget = spawn('wget', argStr);

	wget.stdout.on('data', function(data){
		console.log("stdout:" + data);
	});

	wget.stderr.on('data', function(data){
		console.log("stderr:" + data);
	});

	wget.on('exit', function(code){
		console.log("exit:" + code);
		if(i < urls.length){
			i++;
			_doWget();
		};
	});

	wget.on('error', function(code){
//		console.log('error occured on ' + code);
		if(i < urls.length){
			i++;
			_doWget();
		};
	})
}

fs.readFile('test/url_edited.txt', 'utf8', function (err, text) {
	urls = text.split("\n");
	_doWget();
});