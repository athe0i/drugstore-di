var drugstore = require('./drugstore');
var serviceLocator = require('./serviceLocator');
var service = require('./service');
var contract = require('./contract');

var locatorContract = contract("locatorContract",
    {
        find:function(name) { },
        register: function(name, provider) {}
    });

var serviceLocatorService = service(
    'serviceLocator',
    serviceLocator,
    locatorContract
);

var systemLocator = serviceLocator;
systemLocator.register('serviceLocator', serviceLocatorService);

var systemDI = new drugstore(systemLocator);
module.exports = systemDI;
