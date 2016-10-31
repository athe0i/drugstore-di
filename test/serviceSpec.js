var service = require('../service');
var contract = require('../contract');
var expect = require("chai").expect;

describe("service", function () {
    var testContract = contract("testContract", {
        testMethod: function() { },
        testMethodWithArgs: function(arg1, arg2) {}
    });

    var createService = function(proto) {
        return service('testService', proto, testContract);
    };

    describe("construction", function () {
        it("should not create service if the implementation is wrong", function () {
            var failProto = {testMethod: function(){}};

            try {
                createService(failProto);
            } catch (err) {
                expect(err.message).to.equal('Method [testMethodWithArgs] is not implemented.');
            }

            var failProtoNoArgs = {
                testMethod: function() { },
                testMethodWithArgs: function(arg1) {}
            };

            try {
                createService(failProtoNoArgs);
            } catch (err) {
                expect(err.message).to.equal('Method [testMethodWithArgs] have wrong arguments count');
            }
        });

        it("should create service with the appropriate implementation", function(){
            var simpleObject = {
                testMethod: function() {return "test";},
                testMethodWithArgs: function(arg1, arg2) {return "test1";}
            };

            expect(createService(simpleObject)).to.be.ok;

            var constructorForObject = function() {
                //this.testMethod = function() {return "test";};
                this.testMethodWithArgs = function(arg1, arg2) {return "test1";};
            };
            constructorForObject.prototype.testMethod = function() {return "test";};

            expect(createService(new constructorForObject)).to.be.ok;
        });
    });

    describe("implementation", function () {
        var simpleObject = {
            testMethod: function() {return "test";},
            testMethodWithArgs: function(arg1, arg2) {return "test1";}
        };

        it("should provide exact implementation", function () {
            //expect(createService(simpleObject)).to.be.instanceof(service);
            var testService = createService(simpleObject);
            expect(testService.provide()).to.equal(simpleObject);
        });

        it("should be reimplementable", function () {
            var otherObject = {
                testMethod: function() {return "test2";},
                testMethodWithArgs: function(arg1, arg2) {return "test5";}
            };

            var testService = createService(simpleObject);
            testService.implement(otherObject);

            expect(testService.provide()).to.not.equal(simpleObject);
            expect(testService.provide()).to.equal(otherObject);
            expect(testService.provide().testMethod()).to.equal('test2');
        });
    });
});
