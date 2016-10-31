var isfunction = require('lodash/fp/isFunction');
var $getMethodArgs = require('./getMethodArgs');

module.exports = function (contract, obj) {
    var signatures = contract.getSignatures();
    for (var name in signatures ) {
        if (!obj[name] || !isfunction(obj[name])) {
            throw new Error("Method [" + name + "] is not implemented.");
        }

        if (signatures[name].args.length != $getMethodArgs(obj[name]).length) {
            throw new Error("Method [" + name + "] have wrong arguments count");
        }
    }
};
