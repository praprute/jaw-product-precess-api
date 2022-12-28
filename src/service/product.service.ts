import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";

import dotenv from "dotenv";
import resp from "../utils/response";
import { ICreatePuddle, IUpdateDetailPuddle } from "../types/product";

dotenv.config();

const DB = config.get<any>("database");

export const insertPuddle = async (
  connection: Connection,
  input: ICreatePuddle
) => {
  try {
    const { building_id } = input;
    const sql = `INSERT INTO ${DB}.puddle (uuid_puddle, building_id) values (UUID(), ${building_id}) ; `;
    const result: any = await Query(connection, sql);
    if (result.insertId) {
      return resp(true, "CREATE_SUCCESS");
    } else {
      return resp(false, "APP_CRASH");
    }
  } catch (e: any) {
    return resp(false, "APP_CRASH");
  }
};

export const updateDetailPuddle = async (
  connection: Connection,
  input: IUpdateDetailPuddle
) => {
  try {
    const { building_id, status, uuid_puddle } = input;
    const sql = `UPDATE ${DB}.puddle SET building_id=${building_id},
       status=${status} WHERE uuid_puddle='${uuid_puddle}' ; `;
    await Query(connection, sql);
    return resp(true, "UPDATE_SUCCESS");
  } catch (e: any) {
    return resp(false, "APP_CRASH");
  }
};

export const getAllPuddle = async (
  connection: Connection,
  input: { building_id: number }
) => {
  try {
    const { building_id } = input;
    const sql = `SELECT * FROM ${DB}.puddle where building_id=${building_id}`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    return resp(false, "APP_CRASH");
  }
};

export const createOrder = async (
  connection: Connection,
  input: { order_name: string; userId: number }
) => {
  try {
    const { order_name, userId } = input;
    const sql = `INSERT INTO ${DB}.orders (uuid_order, order_name, user_create) values (UUID(), '${order_name}', ${userId}); `;
    const queryInsertOrder: any = await Query(connection, sql);
    return queryInsertOrder.insertId;
  } catch (e: any) {
    return resp(false, e);
  }
};

export const updatePuddleOrderLasted = async (
  connection: Connection,
  input: { uuid_puddle: string; orderId: number; status: number }
) => {
  try {
    const { uuid_puddle, orderId, status } = input;
    const sql = `UPDATE ${DB}.puddle SET lasted_order=${orderId}, status=${status} WHERE uuid_puddle='${uuid_puddle}' ; `;
    const queryUpdatePuddleOrderLasted = await Query(connection, sql);
    return resp(true, queryUpdatePuddleOrderLasted);
  } catch (e: any) {
    return resp(false, e);
  }
};

export const createSubOrder = async (
  connection: Connection,
  input: {
    orderId: number;
    fish: number;
    salt: number;
    laber: number;
    description: string;
    userId: number;
  }
) => {
  try {
    const { orderId, fish, salt, laber, description, userId } = input;
    const sql = `INSERT INTO ${DB}.sub_orders (idOrders, fish, salt, laber, description, user_create_sub, amount_items) values
       (${orderId}, ${fish},${salt},${laber},'${description}',${userId}, 100);`;
    const queryCreateSubOrder = await Query(connection, sql);
    return resp(true, queryCreateSubOrder);
  } catch (e: any) {
    return resp(false, e);
  }
};

export const getOrderDetails = async (
  connection: Connection,
  input: { order_id: number }
) => {
  try {
    const { order_id } = input;
    const sql = `SELECT * FROM ${DB}.orders
      inner join (SELECT * FROM ${DB}.sub_orders) sub_order on  orders.idorders = sub_order.idOrders where orders.idorders = ${order_id};
      `;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    return resp(false, "APP_CRASH");
  }
};

export const updatePriceSubOrder = async (
  connection: Connection,
  input: {
    fish_price: number;
    salt_price: number;
    laber_price: number;
    amount_unit_per_price: number;
    amount_price: number;
    idsub_orders: number;
  }
) => {
  try {
    const {
      fish_price,
      salt_price,
      laber_price,
      amount_unit_per_price,
      amount_price,
      idsub_orders,
    } = input;
    const sql = `UPDATE ${DB}.sub_orders 
        set fish_price=${fish_price}, salt_price=${salt_price}, laber_price=${laber_price}, amount_unit_per_price=${amount_unit_per_price}, amount_price=${amount_price}
        where idsub_orders = ${idsub_orders};
        `;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    return resp(false, "APP_CRASH");
  }
};

export const updateAmountPriceOrder = async (
  connection: Connection,
  input: {
    amount: number;
    unit_per_price: number;
    price: number;
    uuid_order: string;
  }
) => {
  try {
    const { amount, unit_per_price, price, uuid_order } = input;
    const sql = `UPDATE ${DB}.orders 
          set amount=${amount}, unit_per_price=${unit_per_price}, price=${price}
          where uuid_order = '${uuid_order}';
          `;
    await Query(connection, sql);

    return resp(true, "UPDATE_SUCCESS");
  } catch (e: any) {
      console.log(e)
    return resp(false, "APP_CRASH");
  }
};
