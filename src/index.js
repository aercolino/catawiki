'use strict';

var _ = require('lodash');

var input = [];
var config = {};
const faces = 'NESW';

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
                _.forEach(result, function (theRover) {
                    console.log([theRover.x, theRover.y, faces[theRover.facing]].join(' '));
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



function Rover(start) {
    var self = {
        x: start.x || 0,
        y: start.y || 0,
        facing: start.facing || 0,
        move: move
    };

    self.x = start.x;
    self.y = start.y;
    self.facing = faces.search(start.facing);
    if (! validatePosition(self, config)) {
        // TODO improve message with rover number
        throw Error('Expected the position of all rovers to start into the grid.'); 
    }

    return self;



    function move(movement) {
        switch (movement) {
            case 'L':
                self.facing = (4 + self.facing - 1) % 4;
                break;
            case 'R':
                self.facing = (4 + self.facing + 1) % 4;
                break;
            case 'M':
                switch (faces[self.facing]) {
                    case 'N':
                        self.y += 1;
                        break;
                    case 'E':
                        self.x += 1;
                        break;
                    case 'W':
                        self.x -= 1;
                        break;
                    case 'S':
                        self.y -= 1;
                        break;
                    default:
                        throw Error('Oops, this shoud never happen...');
                        break;
                }
                if (! validatePosition(self, config)) {
                    // TODO improve message with rover number based on index
                    throw Error('Expected the position of all rovers to move into the grid.'); 
                }
                break;
            default:
                throw Error('Oops, this shoud never happen...');
                break;
        }
    }



    function validatePosition(rover, config) {
        var result = true && 
            0 <= rover.x && rover.x <= config.xMax &&
            0 <= rover.y && rover.y <= config.yMax;
        return result;
    }
}



function compute(input) {
    config = parse_config(input);

    var result = [];
    _.forEach(config.rovers, function (rover, index) {
        var theRover = Rover(rover.start);
        _.forEach(rover.movements, theRover.move);
        result.push(theRover);
    });

    return result;
}



function parse_config(input) {
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
                x: parseInt(start[0], 10),
                y: parseInt(start[1], 10),
                facing: start[2],
            },
            movements: result.movements.split('')
        };

        return result;
    });

    var result = {
        'xMax': xyMax[0],
        'yMax': xyMax[1],
        'rovers': rovers
    };
    
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

