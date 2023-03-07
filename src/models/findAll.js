import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.DB_CONNECTION_STR);

async function find(coll, query, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);

    const res = ref.find(query, options);

    if ((await ref.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }

    return res;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

const query = { title: "jarawin" };
const options = {
  sort: { "imdb.title": -1 },
  projection: { _id: 0, title: 1, content: 1 },
};
const res = await find("users", query, options);
console.log(res);
