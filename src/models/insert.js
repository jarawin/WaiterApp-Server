import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.DB_CONNECTION_STR);

async function insert(coll, doc) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);
    return await ref.insertOne(doc).insertedId;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

const doc = {
  title: "jarawin",
  content: "now ja insert already 2",
};
insert("users", doc);

export default insert;
