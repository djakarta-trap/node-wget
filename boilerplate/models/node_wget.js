var exec = require('child_process').exec
var url  = require('url')

var wget = function (argStr, onErrorFunc) {
	exec('wget ' + argStr, function(err, stdout, stderr) {
		onErrorFunc(err);
	})
};

module.exports = wget;