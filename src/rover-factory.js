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

    if (! validatePosition()) {
        throw Error('Expected all rovers to start into the grid. (problem on line ' + line + ')'); 
    }

    return self;



    function move(movement) {
        switch (movement) {
            case 'L': self.facing = (4 + self.facing - 1) % 4; break;
            case 'R': self.facing = (4 + self.facing + 1) % 4; break;
            case 'M':
                switch (config.faces[self.facing]) {
                    case 'N': self.y += 1; break;
                    case 'E': self.x += 1; break;
                    case 'W': self.x -= 1; break;
                    case 'S': self.y -= 1; break;
                    default:
                        throw Error('Oops, this shoud never happen...');
                        break;
                }
                if (! validatePosition()) {
                    throw Error('Expected all rovers to move into the grid. (problem on line ' + (line + 1) + ')');  
                }
                break;
            default:
                throw Error('Oops, this shoud never happen...');
                break;
        }
    }



    function validatePosition() {
        var result = true && 
            0 <= self.x && self.x <= config.xMax &&
            0 <= self.y && self.y <= config.yMax;
        return result;
    }



    function toString() {
        var result = [self.x, self.y, config.faces[self.facing]].join(' ');
        return result;
    }
}
