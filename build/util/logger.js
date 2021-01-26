"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimeString = function () {
    return new Date().toISOString();
};
var logger = function (NAMESPACE, log, options) {
    options ? console.log("[" + getTimeString() + "] " + NAMESPACE + " - [INFO] - " + log, options) : console.log("[" + getTimeString() + "] " + NAMESPACE + " - [INFO] - " + log);
};
exports.default = logger;
