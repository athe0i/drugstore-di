var locator = function (assertion, parent) {
    var registry = {};

    // so yes, i hope to find out how to use local locators... problem?
    var parent = parent instanceof locator ? parent : null;

    this.register = function (name, provider) {
        assertion(provider);

        registry[name] = provider;
    };

    this.find = function (name) {
        if (registry[name]) {
            return registry[name];
        } else if (!registry[name] && parent != null) {
            return parent.find(name);
        } else {
            throw new Error("Provider [" + name + "] not found.");
        }
    };
};

module.exports = function (assertion, parent) {
    return new locator(assertion, parent);
};
