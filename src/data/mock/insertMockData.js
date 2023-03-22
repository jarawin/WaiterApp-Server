import { insertMany } from "../../services/mongodb.js";

import foods from "../foods.js";
const insertAllFoods = async () => {
  const res = await insertMany("foods", foods);
  console.log(res);
};
insertAllFoods();
