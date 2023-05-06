import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";
import dotenv from "dotenv";
import resp from "../utils/response";
import { IRecieveFishWeightBill } from "../types/receive";
import { number } from "zod";

dotenv.config();

const DB = config.get<any>("database");

interface IAllRows {
  allRows: number;
}
export const insertRecieveFishWeightBill = async (
  connection: Connection,
  input: IRecieveFishWeightBill
) => {
  try {
    const {
      no,
      weigh_net,
      price_per_weigh,
      amount_price,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description,
    } = input;
    const sql = `INSERT INTO ${DB}.receipt 
    ( no,
      weigh_net,
      price_per_weigh,
      amount_price,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description,
      stock ) 
    values ('${no}',  ${weigh_net},${price_per_weigh}, ${amount_price}, 
   '${vehicle_register}', '${customer_name}', '${product_name}', '${store_name}', '${description}', ${weigh_net} );`;
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
    weigh_net?: string;
    vehicle_register?: string;
    customer_name?: string;
    product_name?: string;
    store_name?: string;
    stock?: string;
  }
) => {
  try {
    const {
      no,
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
    } = input;
    const sql = `SELECT * FROM ${DB}.receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or vehicle_register LIKE '%${vehicle_register}%' or customer_name LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or store_name LIKE '%${store_name}%' or stock LIKE '%${stock}%' ;`;
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

export const updateStockService = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
  }
) => {
  try {
    const { new_stock, idreceipt } = input;
    const sql = `UPDATE ${DB}.receipt SET stock = stock-${new_stock} WHERE idreceipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const insertLogStockReceive = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
    order_target: number;
    id_puddle: number;
  }
) => {
  try {
    const { new_stock, idreceipt, order_target, id_puddle } = input;
    const sql = `INSERT INTO ${DB}.log_fishweight (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getListReceivePagination = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.receipt limit ${page * offset}, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowListReceive = async (connection: Connection) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.receipt;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getReceiveWeightFishByOrderId = async (
  connection: Connection,
  input: {
    order_id: number;
  }
) => {
  try {
    const { order_id } = input;
    const sql = `SELECT * FROM  ${DB}.log_fishweight 
    inner join (SELECT idreceipt, no, weigh_net, price_per_weigh, amount_price, customer_name, product_name, store_name, stock FROM  ${DB}.receipt) receipe_table on receipe_table.idreceipt = log_fishweight.receipt_target 
    where order_target = ${order_id};`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

// ---------------------------------- salt receipt ---------------------------------- 

export const insertRecieveSaltBill = async (
  connection: Connection,
  input: {
    no: string;
    product_name: string;
    weigh_net: number;
    price_per_weigh: number;
    price_net: number;
    customer: string;
  }
) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
    } = input;
    const sql = `INSERT INTO ${DB}.salt_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net} );`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getSaltListReceivePagination = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.salt_receipt limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowSaltListReceive = async (connection: Connection) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.salt_receipt;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const fillterReceiveSalt = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
  }
) => {
  try {
    const { no, weigh_net, customer_name, product_name, stock } = input;
    const sql = `SELECT * FROM ${DB}.salt_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const insertLogSaltStockReceive = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
    order_target: number;
    id_puddle: number;
  }
) => {
  try {
    const { new_stock, idreceipt, order_target, id_puddle } = input;
    const sql = `INSERT INTO ${DB}.log_salt_receipt (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const updateStockSaltService = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
  }
) => {
  try {
    const { new_stock, idreceipt } = input;
    const sql = `UPDATE ${DB}.salt_receipt SET stock = stock-${new_stock} WHERE idsalt_receipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getReceiveSaltByOrderId = async (
  connection: Connection,
  input: {
    order_id: number;
  }
) => {
  try {
    const { order_id } = input;
    const sql = `SELECT * FROM  ${DB}.log_salt_receipt 
    inner join (SELECT idsalt_receipt, no, product_name,weigh_net, stock FROM  ${DB}.salt_receipt) receipe_table on receipe_table.idsalt_receipt = log_salt_receipt.receipt_target 
    where order_target = ${order_id};`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

// ---------------------------------- Fish Sauce receipt ---------------------------------- 

export const insertRecieveFiashSauceBill = async (
  connection: Connection,
  input: {
    no: string;
    product_name: string;
    weigh_net: number;
    price_per_weigh: number;
    price_net: number;
    customer: string;
  }
) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
    } = input;
    const sql = `INSERT INTO ${DB}.fishsauce_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net} );`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getFiashSauceListReceivePagination = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.fishsauce_receipt limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowFiashSauceListReceive = async (connection: Connection) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.fishsauce_receipt;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const fillterReceiveFiashSauce = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
  }
) => {
  try {
    const { no, weigh_net, customer_name, product_name, stock } = input;
    const sql = `SELECT * FROM ${DB}.fishsauce_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const insertLogFiashSauceStockReceive = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
    order_target: number;
    id_puddle: number;
  }
) => {
  try {
    const { new_stock, idreceipt, order_target, id_puddle } = input;
    const sql = `INSERT INTO ${DB}.log_fishsauce (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const updateStockFiashSauceService = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
  }
) => {
  try {
    const { new_stock, idreceipt } = input;
    const sql = `UPDATE ${DB}.fishsauce_receipt SET stock = stock-${new_stock} WHERE idfishsauce_receipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getReceiveFiashSauceByOrderId = async (
  connection: Connection,
  input: {
    order_id: number;
  }
) => {
  try {
    const { order_id } = input;
    const sql = `SELECT * FROM  ${DB}.log_fishsauce 
    inner join (SELECT idfishsauce_receipt, no, product_name,weigh_net, stock FROM  ${DB}.fishsauce_receipt) receipe_table on receipe_table.idfishsauce_receipt = log_fishsauce.receipt_target 
    where order_target = ${order_id};`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};