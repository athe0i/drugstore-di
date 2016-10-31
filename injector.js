var contract = require('./contract');
var isfunction = require('lodash/fp/isFunction');
var each = require('lodash/fp/forEach');
var hasProperty = require('lodash/fp/has');

var $getMethodArgs = require('./helpers/getMethodArgs');
var assertImplementation = require('./helpers/assertContractImplementation');
var providableContract = require('./contracts/providableContract');

var injector = function (locator) {
    var provideInjection = function (injection) {
        try {
            assertImplementation(providableContract, injection);
            return injection.provide();
        } catch (Error) {
            return injection;
        }
    };

    var getInjections = function (injectionNames) {
        var injections = [];

        injectionNames.forEach(function (injection) {
            injections.push(provideInjection(locator.find(injection)));
        });

        return injections;
    };

    this.inject = function (func) {
        var injections = [];

        if (func.$inject) {
            injections = getInjections(func.$inject);
        } else {
            injections = getInjections($getMethodArgs(func));
        }

        return func.apply(func.$scope ? func.$scope : {}, injections);
    };
};

module.exports = function (locator) {
    return new injector(locator);
};
