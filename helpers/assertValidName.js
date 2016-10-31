module.exports = function (name) {
    var regexp = new RegExp('^[a-zA-Z0-9]+$');

    if (!regexp.test(name)) {
        throw new Error("Name should include only alphanum chars.");
    }
};
