/**
 * consist defenition of the public methods to implement and name to associate with.
 *
 */
var isfunction = require('lodash/fp/isFunction');
var eachFn = require('lodash/fp/functionsIn');

var $getMethodArgs = require('./helpers/getMethodArgs');

var assertMethods = function (methods) {
    for (var i in methods) {
        var fn = methods[i];
        if(!isfunction(fn))
            throw new Error("Only functions should be mentioned");
    }
};

var getSignatures = function (methods) {
    var signatureMap = {};

    for (var name in methods){
        signatureMap[name] = {
            args: $getMethodArgs(methods[name])
        };
    }

    return signatureMap;
};

var contract = function (name, proto) {

    this.getName = function() {
        return name;
    };

    this.getSignatures = function () {
        return getSignatures(proto);
    };
};

module.exports = function (name, proto) {
    return new contract(name, proto);
};
