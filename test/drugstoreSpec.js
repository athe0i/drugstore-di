var drugstore = require('../index');

var expect = require("chai").expect;

describe("di", function() {
    it("should register new module", function () {
        drugstore.module('main', function() {
            return {
                test: function () {expect(true).to.be.true;},
                echo: function () {return "echo";}
            };
        });
    });

    it("should be able to inject module", function () {
        drugstore.inject(function(main) {
            expect(main.echo()).to.be.equal('echo');
        });
    });

    it("should reimplement module", function () {
        drugstore.module('main', function() {
            return {
                echo: function () {return "test";}
            };
        });

        drugstore.inject(function(main) {
            expect(main.echo()).to.be.equal('test');
        });
    });

    it("shold be available in other place", function () {
        var drugstoreLocal = require('../index');

        drugstoreLocal.inject(function(main) {
            expect(main.echo()).to.be.equal('test');
        });
    });
});
