"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuery = exports.getListing = exports.createManyListing = exports.createListing = void 0;
var config_1 = __importDefault(require("../util/config"));
var mongodb_1 = require("mongodb");
var helper_1 = require("../util/helper");
var uri = "mongodb://" + config_1.default.db.MONGODB.username + ":" + config_1.default.db.MONGODB.password + "@" + config_1.default.db.MONGODB.host + ":" + config_1.default.db.MONGODB.port + "?retryWrites=true&w=majority";
var client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var createListing = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var database, collection, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                database = client.db(config_1.default.db.MONGODB.database);
                collection = database.collection("listings");
                return [4 /*yield*/, collection.insertOne(data)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result.ops];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, false];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createListing = createListing;
var createManyListing = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var data, database, collection, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = Array(amount)
                    .fill(0)
                    .map(function (_) { return helper_1.randomListing(helper_1.randomUUID()); });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                database = client.db(config_1.default.db.MONGODB.database);
                collection = database.collection("listings");
                return [4 /*yield*/, collection.insertMany(data)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result.ops];
            case 4:
                err_2 = _a.sent();
                console.error(err_2);
                return [2 /*return*/, false];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createManyListing = createManyListing;
var getListing = function () { return __awaiter(void 0, void 0, void 0, function () {
    var database, collection, cursor, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                database = client.db(config_1.default.db.MONGODB.database);
                collection = database.collection("listings");
                return [4 /*yield*/, collection.find({}).sort({ postedAt: -1 }).limit(20).toArray()];
            case 2:
                cursor = _a.sent();
                return [2 /*return*/, cursor];
            case 3:
                err_3 = _a.sent();
                console.error(err_3);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getListing = getListing;
var searchQuery = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var database, collection, cursor, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                database = client.db(config_1.default.db.MONGODB.database);
                collection = database.collection("listings");
                return [4 /*yield*/, collection.find(query).limit(20).toArray()];
            case 2:
                cursor = _a.sent();
                return [2 /*return*/, cursor];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchQuery = searchQuery;
