'use strict';

const _ = require('lodash');
const readline = require('readline');
const Rover = require('./rover-factory');

module.exports = function (context) {
    const rli = readline.createInterface(context.stdin, context.stdout);

    var config = {faces: 'NESW'};
    var input = [];

    rli.setPrompt('CataWiki> ');
    rli.prompt();

    rli.on('line', function (line) {
        line = line.trim();
        switch (line) {

            case '':
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
        rli.prompt();
    }).on('close', () => {
        console.log('Have a great day!');
        context.process.exit(0);
    });

    return rli;



    function compute(entries) {
        var result = [];
        _.forEach(entries, function (entry) {
            _.forEach(entry.movements, entry.rover.move);
            result.push(entry.rover);
        });

        return result;
    }



    function parse_input() {
        if (! (input.length >= 3 && input.length % 2 === 1)) {
            throw Error('Expected an odd number of lines (min 3).');
        }

        setGrid(input[0]);
        var lineEntries = _.chunk(_.drop(input), 2);
        var result = _.map(lineEntries, function (lineEntry, index) {
            var line_number = 2 * index + 1;
            var start = getStartingPosition(lineEntry[0], line_number);
            var movements = getMovements(lineEntry[1], line_number + 1);
            var result = {
                rover: Rover(start, config, line_number),
                movements: movements
            };

            return result;
        });

        return result;



        function setGrid(line) {
            if (! validateGrid(line)) {
                throw Error('Expected only two spaced integers on the first line.');
            }
            var xyMax = _.map(_.compact(line.split(' ')), function(n) { return parseInt(n, 10); });
            config.xMax = xyMax[0];
            config.yMax = xyMax[1];
        }



        function getStartingPosition(line, line_number) {
            if (! validateStartingPosition(line)) {
                throw Error('Expected only two spaced integers followed by a NEWS letter on line ' + line_number + '.');
            }
            var data = line.split(' ');
            var result = {
                x: parseInt(data[0], 10),
                y: parseInt(data[1], 10),
                facing: data[2]
            };
            return result;
        }



        function getMovements(line, line_number) {
            if (! validateMovements(line)) {
                throw Error('Expected only LRM letters on line ' + line_number + '.');
            }
            var result = line.split('');
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
    }
}
