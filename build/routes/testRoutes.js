"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var NAMESPCE = "TEST";
var BASE_URL = "/test";
router.get("" + BASE_URL, function (req, res) {
    res.status(200).json({
        method: req.method,
        statusCode: 200,
        message: "Response from " + req.url,
    });
});
exports.default = router;
