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
            try {
                var result = compute(input);
                console.log(result);
            }
            catch (e) {
                console.log(e);
            }
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
    result = JSON.stringify(result);
    return result;
}



function validateGrid(line) {
    var result = line.search(/^\d+ \d+$/g);
    return result !== -1;
}



function validateStartingPosition(line) {
    var result = line.search(/^\d+ \d+ [NEWS]$/g);
    return result !== -1;
}



function validateMovements(line) {
    var result = line.search(/^[LRM]+$/g);
    return result !== -1;
}



function config(input) {
    if (input.length % 2 === 0) {
        throw Error('Expected an odd number of lines.');
    }

    if (! validateGrid(input[0])) {
        throw Error('Expected only two spaced integers on the first line.');
    }
    var xyMax = _.map(_.compact(input[0].split(' ')), function(n) { return parseInt(n, 10); });
    input.shift(); // drop first line

    var inputRovers = _.chunk(input, 2);
    var rovers = _.map(inputRovers, function (inputRover, index) {
        var result = {
            start: inputRover[0],
            movements: inputRover[1]
        };

        if (! validateStartingPosition(result.start)) {
            throw Error('Expected only two spaced integers followed by a NEWS letter on line ' + (2 * index + 1) + '.');
        }

        if (! validateMovements(result.movements)) {
            throw Error('Expected only LRM letters on line ' + (2 * index + 2) + '.');
        }

        var start = result.start.split(' ');
        var result = {
            start: {
                x: start[0],
                y: start[1],
                facing: start[2],
            },
            movements: result.movements.split('')
        };

        return result;
    });



    var result = {
        'Xmax': xyMax[0],
        'Ymax': xyMax[1],
        'rovers': rovers
    };
    return result;
}

