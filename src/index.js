'use strict';

var _ = require('lodash');
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
    var result = input;
    result = config(result);
    return result;
}



function config(input) {
    var xyMax = _.map(_.compact(input[0].split(' ')), function(n) { return parseInt(n, 10); });

    var result = {
        'Xmax': xyMax[0],
        'Ymax': xyMax[1]
    };
    return result;
}

