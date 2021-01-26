import express from "express";
import bodyParser from "body-parser";
import { Client } from "@elastic/elasticsearch";
import { Pool } from "pg";

import config from "./util/config";
import logger from "./util/logger";

import userRoutes from "./routes/userRoutes";
import listingRoutes from "./routes/listingRoutes";

const app = express();
const client = new Client({ node: config.es.ELASTIC_SEARCH });
const pool = new Pool(config.db.POSTGRES_DB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Logger */
app.use((req, res, next) => {
  logger("SERVER", `METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}]`);
  res.on("finish", () => {
    logger("SERVER", `METHOD: [${req.method}] - URL: [${req.originalUrl}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  });
  next();
});

/** Check status of the Server */
app.get("/", (req, res) => {
  res.status(200).json({ status: "live" });
});

/** Routes */
app.use("/api", userRoutes);
app.use("/api", listingRoutes);

/** 404 Routes */
app.use((req, res) => {
  res.status(404);
});

/** Server Listen */
app.listen(config.server.SERVER_PORT, config.server.SERVER_HOSTNAME, () => {
  logger("SERVER", `Server is live at http://${config.server.SERVER_HOSTNAME}:${config.server.SERVER_PORT}`);
});
