import {
  findOne,
  findMany,
  insertOne,
  insertMany,
} from "../services/mongodb.js";
import { v4 as uuidv4 } from "uuid";

//? === === === GET FOOD === === ===
const getAllFood = async (req, res) => {
  console.log("get all food");
  const foods = await findMany("foods");
  const popularFoods = foods.filter((f) => f.category === "popular");
  const recommendFoods = foods.filter((f) => f.category === "recommended");
  const payload = { popularFoods, recommendFoods };
  return res.send(payload).status(200);
};

//? === === === ADD ORDER === === ===
const reFormatNewOrder = (orders) => {
  const newOrders = orders.map((o) => {
    return { _id: o._id, status: "COOKING" };
  });
  return newOrders;
};

const addOrder = async (req, res) => {
  const user_id = req.body?.user?._id;
  const orders = reFormatNewOrder(req.body?.orders);

  const data = { user_id, orders: orders, _id: uuidv4() };

  const response = await insertOne("orders", data);
  console.log(response);

  return res.send({ data, message: "add order success." }).status(200);
};

//? === === === GET ORDER === === ===
const getOrderByUserId = async (user_id) => {
  const orders = await findMany("orders", { user_id });
  return orders;
};

const getOrderByOrderId = async (order_id) => {
  const order = await findOne("orders", { _id: order_id });
  return order;
};

const getAllOrder = async () => {
  const orders = await findMany("orders");
  return orders;
};

const getOrder = async (req, res) => {
  const { order_id, user_id } = req.query;

  var order;
  if (order_id) {
    console.log("order_id", order_id);
    order = await getOrderByOrderId(order_id);
  } else if (user_id) {
    console.log("user_id", user_id);
    order = await getOrderByUserId(user_id);
  } else {
    console.log("all");
    order = await getAllOrder();
  }

  if (!order) {
    return res.send({ message: "order not found" }).status(404);
  } else {
    return res.send({ data: order, message: "get order success" }).status(200);
  }
};

// const addOrder = async (req, res) => {
//   const user_id = req.body?.user?._id;

export { getAllFood, addOrder, getOrder };
