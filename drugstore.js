var injector = require('./injector');
var locator = require('./locator');
var service = require('./service');

var voidContract = require('./contracts/voidContract');

var drugstore = function (serviceLocator) {
    this.injector = injector(serviceLocator);

    this.service = function (service) {
        serviceLocator.register(service.getName(), service);
    };

    this.inject = function (func) {
        return this.injector.inject(func);
    };

    this.module = function (name, func, contract) {
        contract = contract || voidContract;
        var module = this.inject(func);

        var moduleService = service(name, module, contract);
        this.service(moduleService);
    };
};

module.exports = drugstore;
