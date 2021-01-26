"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
var SERVER_PORT = Number(String(process.env.SERVER_PORT)) || 4000;
var MONGODB_HOST = process.env.MONGODB_HOST || "localhost";
var MONGODB_PORT = Number(String(process.env.MONGODB_PORT)) || 27017;
var MONGODB_USERNAME = process.env.MONGODB_USERNAME || "root";
var MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "password";
var MONGODB_DATABASE = process.env.MONGODB_DATABASE || "db";
var POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST || "localhost";
var POSTGRES_DB_PORT = Number(String(process.env.POSTGRES_DB_PORT)) || 5432;
var POSTGRES_DB_DATABASE = process.env.POSTGRES_DB_DATABASE || "postgres";
var POSTGRES_DB_USER = process.env.POSTGRES_DB_USER || "postgres";
var PROGRESS_DB_PASSWORD = process.env.POSTGRES_DB_PASSWORD || "123456";
var ELASTIC_SEARCH = process.env.ELASTIC_SEARCH || "http://localhost:9200";
var ELASTIC_USERNAME = process.env.ELASTIC_USERNAME;
var ELASTIC_PASSWORD = process.env.ELASTIC_PASSWORD;
exports.default = {
    server: {
        SERVER_HOSTNAME: SERVER_HOSTNAME,
        SERVER_PORT: SERVER_PORT,
    },
    db: {
        POSTGRES_DB: {
            host: POSTGRES_DB_HOST,
            port: POSTGRES_DB_PORT,
            database: POSTGRES_DB_DATABASE,
            user: POSTGRES_DB_USER,
            password: PROGRESS_DB_PASSWORD,
        },
        MONGODB: {
            host: MONGODB_HOST,
            port: MONGODB_PORT,
            username: MONGODB_USERNAME,
            password: MONGODB_PASSWORD,
            database: MONGODB_DATABASE,
        },
    },
    es: {
        ELASTIC_SEARCH: ELASTIC_SEARCH,
        auth: {
            ELASTIC_USERNAME: ELASTIC_USERNAME,
            ELASTIC_PASSWORD: ELASTIC_PASSWORD,
        },
    },
};
