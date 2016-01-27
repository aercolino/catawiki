var assert = require('assert');
var _ = require('lodash');
var Rover = require('../src/rover-factory');


describe('Rover Factory', function() {

    describe('a rover is properly built', function() {

        it('should have the start position before any movement', function() {

            var rover = Rover({x: 1, y: 1, facing: 'N'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
            assert.equal('1 1 N', rover.toString());

        });


        it('should throw an exception when the start is not inside the grid', function() {

            function bubble_exception() {
                Rover({x: 6, y: 6, facing: 'N'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
            }
            assert.throws(bubble_exception, 'Error');
            
        });

    });



    describe('a rover turns and moves', function() {

        describe('a rover turns Right', function() {

            it('should face East if it started facing North', function() {

                var rover = Rover({x: 1, y: 1, facing: 'N'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('R');
                assert.equal('1 1 E', rover.toString());

            });


            it('should face South if it started facing East', function() {

                var rover = Rover({x: 1, y: 1, facing: 'E'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('R');
                assert.equal('1 1 S', rover.toString());

            });


            it('should face West if it started facing South', function() {

                var rover = Rover({x: 1, y: 1, facing: 'S'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('R');
                assert.equal('1 1 W', rover.toString());

            });


            it('should face North if it started facing WestLeftLe', function() {

                var rover = Rover({x: 1, y: 1, facing: 'W'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('R');
                assert.equal('1 1 N', rover.toString());

            });

        });


        describe('a rover turns Left', function() {

            it('should face East if it started facing South', function() {

                var rover = Rover({x: 1, y: 1, facing: 'S'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('L');
                assert.equal('1 1 E', rover.toString());

            });


            it('should face South if it started facing West', function() {

                var rover = Rover({x: 1, y: 1, facing: 'W'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('L');
                assert.equal('1 1 S', rover.toString());

            });


            it('should face West if it started facing North', function() {

                var rover = Rover({x: 1, y: 1, facing: 'N'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('L');
                assert.equal('1 1 W', rover.toString());

            });


            it('should face North if it started facing East', function() {

                var rover = Rover({x: 1, y: 1, facing: 'E'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('L');
                assert.equal('1 1 N', rover.toString());

            });

        });


        describe('a rover moves', function() {

            it('should increase y if it started facing North', function() {

                var rover = Rover({x: 1, y: 1, facing: 'N'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('M');
                assert.equal('1 2 N', rover.toString());

            });


            it('should decrease y if it started facing South', function() {

                var rover = Rover({x: 1, y: 1, facing: 'S'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('M');
                assert.equal('1 0 S', rover.toString());

            });


            it('should increase x if it started facing East', function() {

                var rover = Rover({x: 1, y: 1, facing: 'E'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('M');
                assert.equal('2 1 E', rover.toString());

            });


            it('should decrease x if it started facing West', function() {

                var rover = Rover({x: 1, y: 1, facing: 'W'}, {xMax: 5, yMax:5, faces: 'NESW'}, 3);
                rover.move('M');
                assert.equal('0 1 W', rover.toString());

            });

        });

    });

});
