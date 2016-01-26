'use strict';

var _ = require('lodash');

var input = [];
var config = {faces: 'NESW'};
var Rover = require('./rover-factory');

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
                var entries = parse_input();
                var rovers = compute(entries);
                _.forEach(rovers, function (rover) {
                    console.log(rover.toString());
                });
            }
            catch (e) {
                console.log(e.stack || e);
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



function compute(entries) {
    var result = [];
    _.forEach(entries, function (entry) {
        _.forEach(entry.movements, entry.rover.move);
        result.push(entry.rover);
    });

    return result;
}



function parse_input() {
    if (input.length % 2 === 0) {
        throw Error('Expected an odd number of lines.');
    }

    if (! validateGrid(input[0])) {
        throw Error('Expected only two spaced integers on the first line.');
    }
    var xyMax = _.map(_.compact(input[0].split(' ')), function(n) { return parseInt(n, 10); });
    config.xMax = xyMax[0];
    config.yMax = xyMax[1];
    input.shift(); // drop first line

    var lineEntries = _.chunk(input, 2);
    var result = _.map(lineEntries, function (lineEntry, index) {

        var line = 2 * index + 1;

        var start = lineEntry[0];
        if (! validateStartingPosition(start)) {
            throw Error('Expected only two spaced integers followed by a NEWS letter on line ' + (line) + '.');
        }
        start = start.split(' ');
        
        var movements = lineEntry[1];
        if (! validateMovements(movements)) {
            throw Error('Expected only LRM letters on line ' + (line + 1) + '.');
        }
        movements = movements.split('');

        var result = {
            line: line,
            rover: Rover({
                x: parseInt(start[0], 10),
                y: parseInt(start[1], 10),
                facing: start[2]
            }, config, line),
            movements: movements
        };

        return result;
    });

    return result;



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
}

