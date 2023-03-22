import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.DB_CONNECTION_STR);

export async function insertOne(coll, doc) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);
    return await ref.insertOne(doc);
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}

export async function insertMany(coll, docs) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);
    return await ref.insertMany(docs);
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}

export async function findOne(coll, query, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);

    const res = ref.findOne(query, options);

    if ((await ref.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }

    return res;
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}

export async function findMany(coll, query, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);

    const cursor = ref.find(query, options);

    var res = [];
    await cursor.forEach((doc) => {
      res.push(doc);
    });
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}

export async function updateOne(coll, filter, updateDoc, options) {
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
    // await client.close();
  }
}

export async function updateMany(coll, filter, updateDoc, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);

    const result = await ref.updateMany(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}

export async function deleteOne(coll, filter, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);

    const result = await ref.deleteOne(filter, options);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}

export async function deleteMany(coll, filter, options) {
  try {
    const database = client.db(process.env.DB_NAME);
    const ref = database.collection(coll);

    const result = await ref.deleteMany(filter, options);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
  }
}

//?? Insert one document
// const doc = {
//   title: "jarawin",
//   content: "now ja insert already 2",
// };
// const res = await insertOne("users", doc);
// console.log(res);

//?? Insert many documents
// const docs = [
//   {
//     title: "jarawin",
//     content: "now ja insert already 1",
//   },
//   {
//     title: "jarawin",
//     content: "now ja insert already 3",
//   },
// ];
// const res = await insertMany("users", docs);
// console.log(res);

//?? Find one document in a collection
// const query = { title: "jarawin" };
// const options = {
//   sort: { "imdb.title": -1 },
//   projection: { _id: 0, title: 1, content: 1 },
// };
// const res = await findOne("users", query, options);
// console.log(res);

//?? Find all documents in a collection
// const query = { user_id: "da654f57-5e00-4a9a-81bd-b76e047386a6" };
// const options = {
//   sort: { "imdb.title": -1 },
//   projection: { _id: 0, title: 1, content: 1 },
// };
// const res = await findMany("orders", query);
// console.log(res);

//?? Update one document in a collection
// const filter = { title: "jarawin" };
// const options = {
//   upsert: false,
// };
// const updateDoc = {
//   $set: {
//     title: `ja ${Math.random()}`,
//   },
// };
// const res = await updateOne("users", filter, updateDoc, options);
// console.log(res);

//?? Update many documents in a collection
// const filter = { title: "jarawin" };
// const options = {
//   upsert: false,
// };
// const updateDoc = {
//   $set: {
//     title: `ja ${Math.random()}`,
//   },
// };
// const res = await updateMany("users", filter, updateDoc, options);
// console.log(res);

//?? Delete one document in a collection
// const filter = { title: "jarawin" };
// const options = {
//   collation: { locale: "en", strength: 2 },
// };
// const res = await deleteOne("users", filter, options);
// console.log(res);

//?? Delete many documents in a collection
// const filter = { title: "jarawin" };
// const options = {
//   collation: { locale: "en", strength: 2 },
// };
// const res = await deleteMany("users", filter, options);
// console.log(res);
