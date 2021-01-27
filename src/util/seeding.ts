import config from "../util/config";
import faker from "faker";
import { MongoClient } from "mongodb";
import { Client } from "@elastic/elasticsearch";
import { Listing, randomListing, randomUUID, User } from "./helper";

//const uri = `mongodb://${config.db.MONGODB.username}:${config.db.MONGODB.password}@${config.db.MONGODB.host}:${config.db.MONGODB.port}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${config.db.MONGODB.username}:${config.db.MONGODB.password}@test.zid96.mongodb.net/db?retryWrites=true&w=majority`;
console.log(`[MONGODB] Connecting to ${uri}`);
const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const es = new Client({ node: config.es.ELASTIC_SEARCH });

const allDataListing: any = [];

const createFakeUser = async () => {
  const userID = randomUUID();
  const numberOfListing = Math.floor(Math.random() * 10) + 1;
  const listingData = await Promise.all(
    Array(numberOfListing)
      .fill(0)
      .map((_) => {
        const listing = randomListing(userID);
        allDataListing.push(listing);
        return listing;
      })
  );

  return {
    _id: userID,
    title: faker.name.prefix(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    total_listings: numberOfListing,
    listings: listingData.map((listing) => listing._id),
    created: faker.date.past(2),
  };
};

const insertManyListing = async (data: Listing[]) => {
  await mongo.connect();
  try {
    const database = mongo.db(config.db.MONGODB.database);
    await database.collection("listings").insertMany(data, {});
  } catch (error) {
    console.log(error);
  } finally {
    console.log("[MONGODB] Successfully Seeded Listings Database");
  }
};

const insertManyUsers = async (data: User[]) => {
  try {
    const database = mongo.db(config.db.MONGODB.database);
    await database.collection("users").insertMany(data, {});
  } catch (error) {
    console.log(error);
  } finally {
    await mongo.close();
    console.log("[MONGODB] Successfully Seeded Users Database");
  }
};

const seedUserDatabase = async () => {
  const totalSeed = 20000;
  const allUsers = await Promise.all(
    Array(totalSeed)
      .fill(0)
      .map((_) => createFakeUser())
  );

  try {
    await insertManyListing(allDataListing);
    await insertManyUsers(allUsers);
  } catch (error) {
    console.log(error);
  }
};

seedUserDatabase();
