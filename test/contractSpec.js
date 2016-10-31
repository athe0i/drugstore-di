var expect = require("chai").expect;
var contract = require('../contract');

describe("contract", function() {
    var testContract = contract("testContract", {
        testMethod: function() { },
        testMethodWithArgs: function(arg1, arg2) {}
    });

    it("should return contract name", function () {
        expect(testContract.getName()).to.equal("testContract");
    });

    it("should return contract signatures", function () {
        expect(testContract.getSignatures()).to.deep.equal({
            testMethod: {args: []},
            testMethodWithArgs: {args: ['arg1', 'arg2']}
        });
    });
});
