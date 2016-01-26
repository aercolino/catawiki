'use strict';

const readline = require('readline');
const rli = readline.createInterface(process.stdin, process.stdout);

const cli = require('./cli');
cli(rli);
