import faker from "faker";

export const generateRandomSecret = (amount: number): string => {
  return Array(5)
    .fill(0)
    .map((_) => Math.random().toString(36).substring(7))
    .join("");
};

export interface User {
  _id: string;
  title?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  total_listings?: number;
  listings?: string[];
  created: Date;
}

export interface Listing {
  _id: string;
  userID: string;
  title: string;
  price: string;
  category: string;
  description: string;
  postedAt: Date;
}

export const randomUser = (): User => {
  const uuid = faker.random.uuid();
  const numberOfListing = Math.floor(Math.random() * 20) + 1;
  const randomListings = Array(numberOfListing)
    .fill(0)
    .map((_) => randomListing(uuid));

  return {
    _id: uuid,
    title: faker.name.prefix(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    // total_listings: numberOfListing,
    // listings: randomListings,
    created: faker.date.past(1),
  };
};

export const randomListing = (userID: string): Listing => {
  return {
    userID,
    _id: faker.random.uuid(),
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    postedAt: faker.date.recent(7),
  };
};

export const randomUUID = (): string => {
  return faker.random.uuid();
};

export const insertQueryGenerator = (params: object): string => {
  const PARAMS = Object.entries(params).map((n) => n[0]);
  const VALUES = Array(PARAMS.length)
    .fill(0)
    .map((n, index) => `$${index + 1}`)
    .join(", ");

  return `INSERT INTO users (${PARAMS.join(", ")}) VALUES (${VALUES})`;
};
