// see http://yahooeng.tumblr.com/post/75054690857/code-coverage-for-executable-nodejs-scripts

const assert = require('chai').assert;
const cli    = require('../src/cli');
const stream = require('mock-utf8-stream');

function cleanContext() {
    return {
        process: { 
            exit: function (n) {} 
        }, 
        stdin:   new stream.MockReadableStream(), 
        stdout:  new stream.MockWritableStream()
    };
}


describe('A CLI starts /', function() {

    it('should present a prompt', function() {

        var context = cleanContext();
        context.stdout.captureData();
        var rli = cli(context);
        assert.equal(context.stdout.capturedData, 'CataWiki> ');
        rli.close();

    });

});

