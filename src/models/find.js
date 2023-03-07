import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.DB_CONNECTION_STR);

async function findAll(coll, query, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);

    ref.find(query, options).toArray((err, res) => {
      if (err) throw err;
      return res;
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// example usage
const query = { title: "jarawin" };
const options = {
  sort: { "imdb.title": -1 },
  projection: { _id: 0, title: 1, content: 1 },
};
const res = await findAll("users", query, options);
console.log(res);

export default findAll;
