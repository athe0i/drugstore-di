var injector = require('../injector');
var locator = require('../locator');
var service = require('../service');
var contract = require('../contract');
var providableContract = require('../contracts/providableContract');
var assertImplementation = require('../helpers/assertContractImplementation');

var expect = require("chai").expect;

describe("injector", function () {
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

    var testLocator = locator(assertion);
    testLocator.register(testService.getName(), testService);

    var testInjector = injector(testLocator);

    it("should inject from $inject array", function () {
        var test = function (injected) {
            expect(injected).to.equal(testService.provide());
        };

        test.$inject = [testService.getName()];

        testInjector.inject(test);
    });

    it("should inject from arguments", function () {
        var test = function (testService) {
            return testService;
        };

        expect(testInjector.inject(test)).to.equal(testService.provide());;
    });
});
