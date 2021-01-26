import config from "../util/config";
import { MongoClient } from "mongodb";
import { randomUser, User } from "../util/helper";

const uri = `mongodb://${config.db.MONGODB.username}:${config.db.MONGODB.password}@${config.db.MONGODB.host}:${config.db.MONGODB.port}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const createUser = async (data: User) => {
  try {
    await client.connect();
    const database = client.db(config.db.MONGODB.database);
    const collection = database.collection("users");
    const result = await collection.insertOne(data);
    return result.ops;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const createManyUsers = async (amount: number) => {
  const data = Array(amount)
    .fill(0)
    .map((_) => randomUser());
  try {
    await client.connect();
    const database = client.db(config.db.MONGODB.database);
    const collection = database.collection("users");
    const result = await collection.insertMany(data);
    return result.ops;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getUsers = async () => {
  try {
    await client.connect();
    const database = client.db(config.db.MONGODB.database);
    const collection = database.collection("users");
    const cursor = await collection.find({}).sort({ created: -1 }).limit(20).toArray();
    return cursor;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const searchQuery = async (query: object) => {
  try {
    await client.connect();
    const database = client.db(config.db.MONGODB.database);
    const collection = database.collection("users");
    const cursor = await collection.find(query).limit(20).toArray();
    return cursor;
  } catch (err) {
    console.error(err);
    return [];
  }
};
