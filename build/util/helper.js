"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertQueryGenerator = exports.randomUUID = exports.randomListing = exports.randomUser = void 0;
var faker_1 = __importDefault(require("faker"));
var randomUser = function () {
    var uuid = faker_1.default.random.uuid();
    var numberOfListing = Math.floor(Math.random() * 20) + 1;
    var randomListings = Array(numberOfListing)
        .fill(0)
        .map(function (_) { return exports.randomListing(uuid); });
    return {
        _id: uuid,
        title: faker_1.default.name.prefix(),
        firstname: faker_1.default.name.firstName(),
        lastname: faker_1.default.name.lastName(),
        username: faker_1.default.internet.userName(),
        email: faker_1.default.internet.email(),
        // total_listings: numberOfListing,
        // listings: randomListings,
        created: faker_1.default.date.past(1),
    };
};
exports.randomUser = randomUser;
var randomListing = function (userID) {
    return {
        _id: faker_1.default.random.uuid(),
        userID: userID,
        title: faker_1.default.commerce.product(),
        price: faker_1.default.commerce.price(),
        category: faker_1.default.commerce.department(),
        description: faker_1.default.commerce.productDescription(),
        postedAt: faker_1.default.date.recent(7),
    };
};
exports.randomListing = randomListing;
var randomUUID = function () {
    return faker_1.default.random.uuid();
};
exports.randomUUID = randomUUID;
var insertQueryGenerator = function (params) {
    var PARAMS = Object.entries(params).map(function (n) { return n[0]; });
    var VALUES = Array(PARAMS.length)
        .fill(0)
        .map(function (n, index) { return "$" + (index + 1); })
        .join(", ");
    return "INSERT INTO users (" + PARAMS.join(", ") + ") VALUES (" + VALUES + ")";
};
exports.insertQueryGenerator = insertQueryGenerator;
