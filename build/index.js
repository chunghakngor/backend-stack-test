"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var elasticsearch_1 = require("@elastic/elasticsearch");
var config_1 = __importDefault(require("./util/config"));
var logger_1 = __importDefault(require("./util/logger"));
var testRoutes_1 = __importDefault(require("./routes/testRoutes"));
var app = express_1.default();
var client = new elasticsearch_1.Client({ node: config_1.default.es.ELASTIC_SEARCH });
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/** Logger */
app.use(function (req, res, next) {
    logger_1.default("SERVER", "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on("finish", function () {
        logger_1.default("SERVER", "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
/** Check status of the Server */
app.get("/", function (req, res) {
    res.status(200).json({ status: "live" });
});
/** Routes */
app.use(testRoutes_1.default);
/** 404 Routes */
app.use(function (req, res) {
    res.status(404);
});
/** Server Listen */
app.listen(config_1.default.server.SERVER_PORT, config_1.default.server.SERVER_HOSTNAME, function () {
    logger_1.default("SERVER", "Server is live at http://" + config_1.default.server.SERVER_HOSTNAME + ":" + config_1.default.server.SERVER_PORT);
});
