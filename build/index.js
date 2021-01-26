"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var elasticsearch_1 = require("@elastic/elasticsearch");
var pg_1 = require("pg");
var config_1 = __importDefault(require("./util/config"));
var logger_1 = __importDefault(require("./util/logger"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var listingRoutes_1 = __importDefault(require("./routes/listingRoutes"));
var app = express_1.default();
var client = new elasticsearch_1.Client({ node: config_1.default.es.ELASTIC_SEARCH });
var pool = new pg_1.Pool(config_1.default.db.POSTGRES_DB);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
/** Logger */
app.use(function (req, res, next) {
    logger_1.default("SERVER", "METHOD: [" + req.method + "] - URL: [" + req.originalUrl + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on("finish", function () {
        logger_1.default("SERVER", "METHOD: [" + req.method + "] - URL: [" + req.originalUrl + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
/** Check status of the Server */
app.get("/", function (req, res) {
    res.status(200).json({ status: "live" });
});
/** Routes */
app.use("/api", userRoutes_1.default);
app.use("/api", listingRoutes_1.default);
/** 404 Routes */
app.use(function (req, res) {
    res.status(404);
});
/** Server Listen */
app.listen(config_1.default.server.SERVER_PORT, config_1.default.server.SERVER_HOSTNAME, function () {
    logger_1.default("SERVER", "Server is live at http://" + config_1.default.server.SERVER_HOSTNAME + ":" + config_1.default.server.SERVER_PORT);
});
