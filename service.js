/**
 * this should consist of the contract and implementation so services could be different implementation of same contracts too.
 */
var $getMethodArgs = require('./helpers/getMethodArgs');
var assertValidName = require('./helpers/assertValidName');
var assertImplementation = require('./helpers/assertContractImplementation');
var voidContract = require('./contracts/voidContract');

var service = function (name, contract, implementation) {
    assertValidName(name);
    assertImplementation(contract, implementation);

    this.getName = function () {
        return name;
    };

    this.getContract = function () {
        return contract;
    };

    // just in case you want to override existing one
    this.implement = function (obj) {
        assertImplementation(contract, obj);

        implementation = obj;
    };

    this.provide = function() {
        return implementation;
    };

};

module.exports = function (name, implementation, contract) {
    contract = contract || voidContract;

    return new service (name, contract, implementation);
};
