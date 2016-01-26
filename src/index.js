'use strict';

var input = [];

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('CataWiki> ');
rl.prompt();

rl.on('line', function (line) {
    line = line.trim();
    switch (line) {

        case '':
            console.log('Result: ');
            var result = compute(input);
            console.log(result);
            input = [];
            break;

        default:
            input.push(line);
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});

return;



function compute(input) {
    return input;
}
