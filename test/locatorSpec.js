var locator = require('../locator');
var service = require('../service');
var contract = require('../contract');
var providableContract = require('../contracts/providableContract');
var assertImplementation = require('../helpers/assertContractImplementation');

var expect = require("chai").expect;

describe('locator', function () {
    var testContract = contract("testContract", {
        testMethod: function() { },
        testMethodWithArgs: function(arg1, arg2) {}
    });

    var simpleObject = {
        testMethod: function() {return "test";},
        testMethodWithArgs: function(arg1, arg2) {return "test1";}
    };

    var testService = service('testService', simpleObject, testContract);

    var assertion = function (provider) {
        assertImplementation(providableContract, provider);
    };

    var testLocator = new locator(assertion);

    describe("register and find provider", function () {
        it("should register new provider", function () {
            testLocator.register(testService.getName(), testService);
        });

        it("should find registered provider", function () {
            expect(testLocator.find(testService.getName())).to.be.equal(testService);
        });

        it("should not register provider, that is not passing assertion", function() {
            try {
                testLocator.register("fail", function() {});
            } catch (error) {
                expect(error.message).to.be.equal("Method [provide] is not implemented.");
            }
        });
    });

    describe("hierarchy search", function () {
        var testChildLocator = locator(assertion, testLocator);

        it("should find provider from the parent locator", function () {
            expect(testChildLocator.find(testService.getName())).to.be.equal(testService);
        });

        it("should find child provider instead of parent with the same name", function () {
            var simpleChildObject = {
                testMethod: function() {return "test_child";},
                testMethodWithArgs: function(arg1, arg2) {return "test1";}
            };

            var testChildService = service('testService', simpleChildObject, testContract);
            testChildLocator.register(testService.getName(), testChildService);

            expect(testChildLocator.find(testService.getName())).to.be.equal(testChildService);
        });
    });
});
