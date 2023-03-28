import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";
import dotenv from "dotenv";
import resp from "../utils/response";
import { IRecieveFishWeightBill } from "../types/receive";

dotenv.config();

const DB = config.get<any>("database");

export const insertRecieveFishWeightBill = async (
  connection: Connection,
  input: IRecieveFishWeightBill
) => {
  try {
    const {
      no,
      weigh_in,
      weigh_out,
      weigh_net,
      price_per_weigh,
      amount_price,
      time_in,
      time_out,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description,
    } = input;
    const sql = `INSERT INTO ${DB}.receipt 
    ( no,
      weigh_in,
      weigh_out,
      weigh_net,
      price_per_weigh,
      amount_price,
      time_in,
      time_out,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description ) 
    values ('${no}', ${weigh_in}, ${weigh_out}, ${weigh_net},${price_per_weigh}, ${amount_price}, 
    '${time_in}', '${time_out}', '${vehicle_register}', '${customer_name}', '${product_name}', '${store_name}', '${description}' );`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getAllReceiveFishWeight = async (connection: Connection) => {
  try {
    const sql = `SELECT * FROM ${DB}.receipt;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getReceiveWeightFishById = async (
  connection: Connection,
  input: { idreceipt: number }
) => {
  try {
    const { idreceipt } = input;
    const sql = `SELECT * FROM ${DB}.receipt where idreceipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const fillterReceiveWeightFish = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_in?: string;
    weigh_out?: string;
    weigh_net?: string;
    time_in?: string;
    time_out?: string;
    vehicle_register?: string;
    customer_name?: string;
    product_name?: string;
    store_name?: string;
  }
) => {
  try {
    const {
      no,
      weigh_in,
      weigh_out,
      weigh_net,
      time_in,
      time_out,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
    } = input;
    const sql = `SELECT * FROM ${DB}.receipt where no LIKE '%${no}%' or weigh_in LIKE '%${weigh_in}%' 
    or weigh_out LIKE '%${weigh_out}%' or weigh_net LIKE '%${weigh_net}%' or time_in LIKE '%${time_in}%' or time_out LIKE '%${time_out}%'
    or vehicle_register LIKE '%${vehicle_register}%' or customer_name LIKE '%${customer_name}%' or product_name LIKE '%${product_name}%' or store_name LIKE '%${store_name}%';`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const updateOrderConnect = async (
  connection: Connection,
  input: {
    order_connect: number;
    idreceipt: number;
  }
) => {
  try {
    const { order_connect, idreceipt } = input;
    const sql = `UPDATE ${DB}.receipt SET order_connect = ${order_connect} WHERE idreceipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};
