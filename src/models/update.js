import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.DB_CONNECTION_STR);

async function update(coll, filter, updateDoc, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const movies = database.collection(coll);

    const result = await movies.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

const coll = "users";
const filter = { title: "jarawin" };
const options = {
  upsert: true,
  returnDocument: "after",
  returnOriginal: false,
};
const updateDoc = {
  $set: {
    title: `ja ${Math.random()}`,
  },
};
const res = await update(coll, filter, updateDoc, options);
console.log(res);
