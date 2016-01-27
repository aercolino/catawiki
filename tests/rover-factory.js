var assert = require('assert');
var _ = require('lodash');
var Rover = require('../src/rover-factory');

var my = {
    config: {xMax: 5, yMax:5, faces: 'NESW'},
    line_number: 3
};

describe('Rover Factory', function() {

    describe('a rover is properly built', function() {

        it('should have the start position before any movement', function() {

            var rover = Rover({x: 1, y: 1, facing: 'N'}, my.config, my.lineNumber);
            assert.equal('1 1 N', rover.toString());

        });


        it('should throw an exception when the start is not inside the grid', function() {

            function bubble_exception() {
                Rover({x: 6, y: 6, facing: 'N'}, my.config, my.lineNumber);
            }
            assert.throws(bubble_exception, 'Error');
            
        });

    });



    describe('a rover turns and moves', function() {

        describe('a rover turns Right', function() {

            it('should face East if it started facing North', function() {

                var rover = Rover({x: 1, y: 1, facing: 'N'}, my.config, my.lineNumber);
                rover.move('R');
                assert.equal('1 1 E', rover.toString());

            });


            it('should face South if it started facing East', function() {

                var rover = Rover({x: 1, y: 1, facing: 'E'}, my.config, my.lineNumber);
                rover.move('R');
                assert.equal('1 1 S', rover.toString());

            });


            it('should face West if it started facing South', function() {

                var rover = Rover({x: 1, y: 1, facing: 'S'}, my.config, my.lineNumber);
                rover.move('R');
                assert.equal('1 1 W', rover.toString());

            });


            it('should face North if it started facing WestLeftLe', function() {

                var rover = Rover({x: 1, y: 1, facing: 'W'}, my.config, my.lineNumber);
                rover.move('R');
                assert.equal('1 1 N', rover.toString());

            });

        });


        describe('a rover turns Left', function() {

            it('should face East if it started facing South', function() {

                var rover = Rover({x: 1, y: 1, facing: 'S'}, my.config, my.lineNumber);
                rover.move('L');
                assert.equal('1 1 E', rover.toString());

            });


            it('should face South if it started facing West', function() {

                var rover = Rover({x: 1, y: 1, facing: 'W'}, my.config, my.lineNumber);
                rover.move('L');
                assert.equal('1 1 S', rover.toString());

            });


            it('should face West if it started facing North', function() {

                var rover = Rover({x: 1, y: 1, facing: 'N'}, my.config, my.lineNumber);
                rover.move('L');
                assert.equal('1 1 W', rover.toString());

            });


            it('should face North if it started facing East', function() {

                var rover = Rover({x: 1, y: 1, facing: 'E'}, my.config, my.lineNumber);
                rover.move('L');
                assert.equal('1 1 N', rover.toString());

            });

        });


        describe('a rover moves', function() {

            it('should increase y if it started facing North', function() {

                var rover = Rover({x: 1, y: 1, facing: 'N'}, my.config, my.lineNumber);
                rover.move('M');
                assert.equal('1 2 N', rover.toString());

            });


            it('should decrease y if it started facing South', function() {

                var rover = Rover({x: 1, y: 1, facing: 'S'}, my.config, my.lineNumber);
                rover.move('M');
                assert.equal('1 0 S', rover.toString());

            });


            it('should increase x if it started facing East', function() {

                var rover = Rover({x: 1, y: 1, facing: 'E'}, my.config, my.lineNumber);
                rover.move('M');
                assert.equal('2 1 E', rover.toString());

            });


            it('should decrease x if it started facing West', function() {

                var rover = Rover({x: 1, y: 1, facing: 'W'}, my.config, my.lineNumber);
                rover.move('M');
                assert.equal('0 1 W', rover.toString());

            });

        });


        describe('should throw an exception when moving outside the grid', function() {

            it('should not go over the yMax', function() {

                function bubble_exception() {
                    var rover = Rover({x: 5, y: 5, facing: 'N'}, my.config, my.lineNumber);
                    rover.move('M');
                }
                assert.throws(bubble_exception, 'Error');

            });

            it('should not go below the yMin', function() {

                function bubble_exception() {
                    var rover = Rover({x: 0, y: 0, facing: 'S'}, my.config, my.lineNumber);
                    rover.move('M');
                }
                assert.throws(bubble_exception, 'Error');

            });

            it('should not go after the xMax', function() {

                function bubble_exception() {
                    var rover = Rover({x: 5, y: 5, facing: 'E'}, my.config, my.lineNumber);
                    rover.move('M');
                }
                assert.throws(bubble_exception, 'Error');

            });

            it('should not go before the xMin', function() {

                function bubble_exception() {
                    var rover = Rover({x: 0, y: 0, facing: 'W'}, my.config, my.lineNumber);
                    rover.move('M');
                }
                assert.throws(bubble_exception, 'Error');

            });

            
        });


    });

});
