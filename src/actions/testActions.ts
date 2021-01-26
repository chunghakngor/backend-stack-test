import { Client } from "@elastic/elasticsearch";
import { Pool } from "pg";
import { insertQueryGenerator, User } from "../util/helper";
import config from "../util/config";

const pool = new Pool(config.db.POSTGRES_DB);
const client = new Client({ node: config.es.ELASTIC_SEARCH });

export const createUser = async (data: User) => {
  const dataArray = Object.entries(data).map((n) => n[1]);
  const query = insertQueryGenerator(data);

  return new Promise<boolean>((resolve, reject) => {
    pool.query(query, dataArray, (error, results) => {
      if (error) {
        console.error(error);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const getUsers = async () => {
  return new Promise<User[]>((resolve, reject) => {
    pool.query(`SELECT * FROM "users" ORDER BY "created" DESC LIMIT 20`, function (err, result) {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        resolve(result.rows);
      }
    });
  });
};

export const searchQuery = async (field: string, searchQuery: string) => {
  const { body } = await client.search({
    index: "users",
    body: {
      query: {
        match: {
          field: searchQuery,
        },
      },
    },
  });

  return body;
};
