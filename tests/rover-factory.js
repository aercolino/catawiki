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

});
