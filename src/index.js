'use strict';

const cli = require('./cli');
cli({
    process: process, 
    stdin:   process.stdin, 
    stdout:  process.stdout
});
