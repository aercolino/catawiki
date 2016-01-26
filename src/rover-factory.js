'use strict';

var _ = require('lodash');

module.exports = RoverFactory;

return;



function RoverFactory(start, config, line) {
    var self = {
        x: start.x,
        y: start.y,
        facing: config.faces.search(start.facing),
        move: move,
        toString: toString
    };

    if (! validatePosition(self, config)) {
        // TODO improve message with rover number
        console.log(self);
        console.log(config);
        throw Error('Expected the position of all rovers to start into the grid. (problem on line ' + line + ')'); 
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
                switch (config.faces[self.facing]) {
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
                    // TODO improve message with rover number
                    throw Error('Expected the position of all rovers to start into the grid. (problem on line ' + (line + 1) + ')');  
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



    function toString() {
        return [self.x, self.y, config.faces[self.facing]].join(' ');
    }
}
