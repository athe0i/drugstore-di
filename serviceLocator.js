var locator = require('./locator');
var service = require('./service');
var providableContract = require('./contracts/providableContract');
var assertImplementation = require('./helpers/assertContractImplementation');

var assertService = function (provider) {
    assertImplementation(providableContract, provider);
};

var serviceLocator = new locator(assertService, null);

module.exports = serviceLocator;
