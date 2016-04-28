var events = require('events');
var expect    = require("chai").expect;

//var BadgeReporter = require('../');
//var runner = new events.EventEmitter();
//new BadgeReporter(runner);

var capture = '';
var oldWrite = process.stdout.write;
function startCapture() {
	process.stdout.write = function(data) {
		capture += data;
	};
}

function stopCapture() {
	process.stdout.write = oldWrite;
}

describe('mocha badge reporter', function() {
	xit('should register test passes and failures then emit a badge on stdout', function(){
		startCapture();
		runner.emit('pass');
		runner.emit('fail');
		runner.emit('end');
		stopCapture();
	});
	 it('should return -1 when the value is not present', function () {
	        expect('foo').to.equal('foo');
    	});
    	 it('should return -1 when the value is not present', function () {
	        expect('foo').to.equal('foo');
    	});
});
