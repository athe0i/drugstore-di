var locator = require('./locator');
var contract = require('./contract');

var assertContract = function (contractProvider) {
    if(!(contractProvider instanceof contract))
        throw new Error("Contract must be instance of drugstore/contract.");
};

var contractLocator = new locator(assertContract, null);

module.exports = contractLocator;
