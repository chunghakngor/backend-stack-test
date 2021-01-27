import config from "../util/config";
import { MongoClient } from "mongodb";
import { Listing, randomListing, randomUUID } from "../util/helper";

const uri = `mongodb://${config.db.MONGODB.username}:${config.db.MONGODB.password}@${config.db.MONGODB.host}:${config.db.MONGODB.port}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const createListing = async (data: Listing) => {
  try {
    await client.connect();
    const database = client.db(config.db.MONGODB.database);
    const collection = database.collection("listings");
    const result = await collection.insertOne(data);
    return result.ops;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const createManyListing = async (amount: number) => {
  const data = Array(amount)
    .fill(0)
    .map((_) => randomListing(randomUUID()));
  try {
    await client.connect();
    const database = client.db(config.db.MONGODB.database);
    const collection = database.collection("listings");
    const result = await collection.insertMany(data);
    return result.ops;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getListing = async () => {
  try {
    await client.connect();
    const database = client.db(config.db.MONGODB.database);
    const collection = database.collection("listings");
    // const cursor = collection
    //   .aggregate([
    //     {
    //       $sort: {
    //         postedAt: -1,
    //       },
    //     },
    //     {
    //       $limit: 20,
    //     },
    //   ])
    //   .toArray();
    const cursor = await collection.find({}).sort({ postedAt: -1 }).limit(20).toArray();
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
    const collection = database.collection("listings");
    // const cursor = await collection
    //   .aggregate([
    //     {
    //       $match: {
    //         category: "Computers",
    //       },
    //     },
    //     {
    //       $sort: {
    //         postedAt: -1,
    //       },
    //     },
    //     {
    //       $limit: 20,
    //     },
    //   ])
    //   .toArray();
    const cursor = await collection.find(query).limit(20).toArray();
    return cursor;
  } catch (err) {
    console.error(err);
    return [];
  }
};
