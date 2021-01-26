"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
var SERVER_PORT = Number(String(process.env.SERVER_PORT)) || 4000;
var SQL_SERVER = process.env.SQL_SERVER || "http://localhost:8080";
var MONGO_DB = process.env.MONGO_DB || "mongodb://mongodb:27017";
var ELASTIC_SEARCH = process.env.ELASTIC_SEARCH || "http://localhost:9200";
var ELASTIC_USERNAME = process.env.ELASTIC_USERNAME;
var ELASTIC_PASSWORD = process.env.ELASTIC_PASSWORD;
exports.default = {
    server: {
        SERVER_HOSTNAME: SERVER_HOSTNAME,
        SERVER_PORT: SERVER_PORT,
    },
    db: {
        SQL_SERVER: SQL_SERVER,
        MONGO_DB: MONGO_DB,
    },
    es: {
        ELASTIC_SEARCH: ELASTIC_SEARCH,
        auth: {
            ELASTIC_USERNAME: ELASTIC_USERNAME,
            ELASTIC_PASSWORD: ELASTIC_PASSWORD,
        },
    },
};
