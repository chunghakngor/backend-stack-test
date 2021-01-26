import dotenv from "dotenv";
dotenv.config();

const SERVER_HOSTNAME: string = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT: number = Number(String(process.env.SERVER_PORT)) || 4000;

const MONGODB_HOST: string = process.env.MONGODB_HOST || "localhost";
const MONGODB_PORT: number = Number(String(process.env.MONGODB_PORT)) || 27017;
const MONGODB_USERNAME: string = process.env.MONGODB_USERNAME || "root";
const MONGODB_PASSWORD: string = process.env.MONGODB_PASSWORD || "password";
const MONGODB_DATABASE: string = process.env.MONGODB_DATABASE || "db";

const POSTGRES_DB_HOST: string = process.env.POSTGRES_DB_HOST || "localhost";
const POSTGRES_DB_PORT: number = Number(String(process.env.POSTGRES_DB_PORT)) || 5432;
const POSTGRES_DB_DATABASE: string = process.env.POSTGRES_DB_DATABASE || "postgres";
const POSTGRES_DB_USER: string = process.env.POSTGRES_DB_USER || "postgres";
const PROGRESS_DB_PASSWORD: string = process.env.POSTGRES_DB_PASSWORD || "123456";

const ELASTIC_SEARCH: string = process.env.ELASTIC_SEARCH || "http://localhost:9200";
const ELASTIC_USERNAME: string | undefined = process.env.ELASTIC_USERNAME;
const ELASTIC_PASSWORD: string | undefined = process.env.ELASTIC_PASSWORD;

export default {
  server: {
    SERVER_HOSTNAME,
    SERVER_PORT,
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
    ELASTIC_SEARCH,
    auth: {
      ELASTIC_USERNAME,
      ELASTIC_PASSWORD,
    },
  },
};
