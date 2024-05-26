import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";
import dotenv from "dotenv";
import resp from "../utils/response";
import { IRecieveFishWeightBill } from "../types/receive";
import { number } from "zod";
import e from "express";

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
      date_action,
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
      stock, date_action ) 
    values ('${no}',  ${weigh_net},${price_per_weigh}, ${amount_price}, 
   '${vehicle_register}', '${customer_name}', '${product_name}', '${store_name}', '${description}', ${weigh_net}, '${date_action}' );`;
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
    dateStart?: string;
    dateEnd?: string;
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
    const sql = `SELECT * FROM ${DB}.receipt where ${
      !!no ? `no LIKE '%${no}%'` : " "
    } ${!!weigh_net ? `and weigh_net LIKE '%${weigh_net}%' ` : " "} 
    ${
      !!vehicle_register
        ? `and vehicle_register LIKE '%${vehicle_register}%' `
        : " "
    } 
    ${!!customer_name ? `and customer_name LIKE '%${customer_name}%' ` : " "} 
    ${!!product_name ? `and product_name LIKE '%${product_name}%' ` : " "} 
    ${!!store_name ? `and store_name LIKE '%${store_name}%' ` : " "} 
    ${!!stock ? `and stock LIKE '%${stock}%' ` : " "} 
    idreceipt > 0 ;`;
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

export const getListReceiveReport = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_net?: string;
    vehicle_register?: string;
    customer_name?: string;
    product_name?: string;
    store_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
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
      dateStart,
      dateEnd,
    } = input;

    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";

    const sql = `SELECT * FROM ${DB}.receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!vehicle_register && vehicle_register !== ""
        ? `vehicle_register LIKE '%${vehicle_register}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    } 
    ${
      !!store_name && store_name !== ""
        ? ` store_name LIKE '%${store_name}%' and `
        : " "
    } 
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idreceipt > 0 and date_action BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY idreceipt desc;`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getListReceivePagination = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
    no?: string;
    weigh_net?: string;
    vehicle_register?: string;
    customer_name?: string;
    product_name?: string;
    store_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
  }
) => {
  try {
    const {
      page,
      offset,
      no,
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
      dateStart,
      dateEnd,
    } = input;

    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";

    const sql = `SELECT * FROM ${DB}.receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!vehicle_register && vehicle_register !== ""
        ? `vehicle_register LIKE '%${vehicle_register}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    } 
    ${
      !!store_name && store_name !== ""
        ? ` store_name LIKE '%${store_name}%' and `
        : " "
    } 
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idreceipt > 0 and date_action BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY idreceipt desc limit ${page * offset}, ${offset} ;`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const searchListReceivePaginationWithoutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
    search: string;
  }
) => {
  try {
    const { page, offset, search } = input;

    const sql = !!search
      ? `SELECT * FROM ${DB}.receipt where customer_name like '%${search}%' or product_name like '%${search}%' or no like '%${search}%' and stock != 0 limit ${
          page * offset
        }, ${offset}`
      : `SELECT * FROM ${DB}.receipt where stock != 0 limit ${
          page * offset
        }, ${offset}`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};
export const searchAllRowListReceiveWithoutEmpty = async (
  connection: Connection,
  input: {
    search: string;
  }
) => {
  try {
    const { search } = input;
    const sql = !!search
      ? `SELECT  COUNT(*) as allRows FROM ${DB}.receipt 
    where customer_name like '%${search}%' or product_name like '%${search}%' or no like '%${search}%' and stock != 0;`
      : `SELECT  COUNT(*) as allRows FROM ${DB}.receipt where  stock != 0;`;

    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getListReceivePaginationWithoutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.receipt where stock != 0 limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowListReceive = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_net?: string;
    vehicle_register?: string;
    customer_name?: string;
    product_name?: string;
    store_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
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
      dateStart,
      dateEnd,
    } = input;

    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";

    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!vehicle_register && vehicle_register !== ""
        ? `vehicle_register LIKE '%${vehicle_register}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    } 
    ${
      !!store_name && store_name !== ""
        ? ` store_name LIKE '%${store_name}%' and `
        : " "
    } 
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idreceipt > 0 and date_action BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY idreceipt desc ;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowListReceiveWithoutEmpty = async (
  connection: Connection
) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.receipt where stock != 0;`;

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
    date_action: string;
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
      date_action,
    } = input;
    const sql = `INSERT INTO ${DB}.salt_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net}, '${date_action}' );`;
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
    const sql = `SELECT * FROM ${DB}.salt_receipt ORDER BY date_action desc limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};
// where stock != 0;

export const getSaltListReceivePaginationWithOutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.salt_receipt where stock > 0 ORDER BY date_action desc limit ${
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
export const getAllRowSaltListReceiveWithOutEmpty = async (
  connection: Connection
) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.salt_receipt  where stock != 0;`;
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
// ---------------------------------- Ampan receipt ----------------------------------
export const insertRecieveAmpanBill = async (
  connection: Connection,
  input: {
    no: string;
    product_name: string;
    weigh_net: number;
    price_per_weigh: number;
    price_net: number;
    customer: string;
    date_action: string;
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
      date_action,
    } = input;
    const sql = `INSERT INTO ${DB}.ampan_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net}, '${date_action}' );`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getAmpanListReceivePagination = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
  }
) => {
  try {
    const {
      page,
      offset,
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = input;

    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";
    const sql = `SELECT * FROM ${DB}.ampan_receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    }
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idampan_receipt > 0 and date_create BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY date_create desc limit ${page * offset}, ${offset} ;`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowAmpanListReceive = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
  }
) => {
  try {
    const {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = input;
    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.ampan_receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    }
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idampan_receipt > 0 and date_create BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY date_create desc ;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const fillterReceiveAmpan = async (
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
    const sql = `SELECT * FROM ${DB}.ampan_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAmpanListReceivePaginationWithOutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.ampan_receipt where stock > 0  ORDER BY date_action desc limit ${
      page * offset
    }, ${offset} ;`;
    const result = await Query(connection, sql);

    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllAmpanSauceListReceiveWithOutEmpty = async (
  connection: Connection
) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.ampan_receipt  where stock > 0;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const insertLogAmpanStockReceive = async (
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
    const sql = `INSERT INTO ${DB}.log_ampan (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const updateStockAmpanService = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
  }
) => {
  try {
    const { new_stock, idreceipt } = input;
    const sql = `UPDATE ${DB}.ampan_receipt SET stock = stock-${new_stock} WHERE idampan_receipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getReceiveAmpanByOrderId = async (
  connection: Connection,
  input: {
    order_id: number;
  }
) => {
  try {
    const { order_id } = input;
    const sql = `SELECT * FROM  ${DB}.log_ampan 
    inner join (SELECT idampan_receipt, no, product_name,weigh_net, stock FROM  ${DB}.ampan_receipt) receipe_table on receipe_table.idampan_receipt = log_ampan.receipt_target 
    where order_target = ${order_id};`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

// ---------------------------------- Fishy receipt ----------------------------------

export const insertRecieveFishyBill = async (
  connection: Connection,
  input: {
    no: string;
    product_name: string;
    weigh_net: number;
    price_per_weigh: number;
    price_net: number;
    customer: string;
    date_action: string;
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
      date_action,
    } = input;
    const sql = `INSERT INTO ${DB}.fishy_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net}, '${date_action}' );`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getFishyListReceivePagination = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
  }
) => {
  try {
    const {
      page,
      offset,
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = input;

    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";
    const sql = `SELECT * FROM ${DB}.fishy_receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    }
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idfishy_receipt > 0 and date_create BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY date_create desc limit ${page * offset}, ${offset} ;`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowFishyListReceive = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
  }
) => {
  try {
    const {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = input;
    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.fishy_receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    }
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idfishy_receipt > 0 and date_create BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY date_create desc ;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getFishyListReceivePaginationWithOutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.fishy_receipt where stock > 0 ORDER BY date_action desc limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);

    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllFishyListReceiveWithOutEmpty = async (
  connection: Connection
) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.fishy_receipt  where stock != 0;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const fillterReceiveFishy = async (
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
    const sql = `SELECT * FROM ${DB}.fishy_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const insertLogFishyStockReceive = async (
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
    const sql = `INSERT INTO ${DB}.log_fishy (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const updateStockFishyService = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
  }
) => {
  try {
    const { new_stock, idreceipt } = input;
    const sql = `UPDATE ${DB}.fishy_receipt SET stock = stock-${new_stock} WHERE idfishy_receipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getReceiveFishyByOrderId = async (
  connection: Connection,
  input: {
    order_id: number;
  }
) => {
  try {
    const { order_id } = input;
    const sql = `SELECT * FROM  ${DB}.log_fishy 
    inner join (SELECT idfishy_receipt, no, product_name,weigh_net, stock FROM  ${DB}.fishy_receipt) receipe_table on receipe_table.idfishy_receipt = log_fishy.receipt_target 
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
    date_action: string;
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
      date_action,
    } = input;
    const sql = `INSERT INTO ${DB}.fishsauce_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net}, '${date_action}' );`;
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
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
  }
) => {
  try {
    const {
      page,
      offset,
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = input;

    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";
    const sql = `SELECT * FROM ${DB}.fishsauce_receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    }
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idfishsauce_receipt > 0 and date_create BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY date_create desc limit ${page * offset}, ${offset} ;`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getFiashSauceListReceivePaginationWithOutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.fishsauce_receipt where stock > 0 ORDER BY date_action desc limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);

    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowFiashSauceListReceive = async (
  connection: Connection,
  input: {
    no?: string;
    weigh_net?: string;
    customer_name?: string;
    product_name?: string;
    stock?: string;
    dateStart?: string;
    dateEnd?: string;
  }
) => {
  try {
    const {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = input;
    let start = !!dateStart && dateStart !== "" ? dateStart : "1999-01-01";
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.fishsauce_receipt where ${
      !!no && no !== "" ? `no LIKE '%${no}%' and ` : " "
    } ${
      !!weigh_net && weigh_net !== ""
        ? `weigh_net LIKE '%${weigh_net}%' and `
        : " "
    } 
    ${
      !!customer_name && customer_name !== ""
        ? ` customer_name LIKE '%${customer_name}%' and `
        : " "
    } 
    ${
      !!product_name && product_name !== ""
        ? ` product_name LIKE '%${product_name}%' and `
        : " "
    }
    ${!!stock && stock !== "" ? ` stock LIKE '%${stock}%' and ` : " "} 
    idfishsauce_receipt > 0 and date_create BETWEEN '${start}' and ${
      !!dateEnd && dateEnd !== "" ? `'${dateEnd}'` : "now()"
    } ORDER BY date_create desc ;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowFiashSauceListReceiveWithOutEmpty = async (
  connection: Connection
) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.fishsauce_receipt  where stock != 0;`;
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

// ---------------------------------- solid salt receipt ----------------------------------

export const insertRecieveSolidSaltBill = async (
  connection: Connection,
  input: {
    no: string;
    product_name: string;
    weigh_net: number;
    price_per_weigh: number;
    price_net: number;
    customer: string;
    date_action: string;
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
      date_action,
    } = input;
    const sql = `INSERT INTO ${DB}.solid_salt_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net} , '${date_action}');`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getSolidSaltListReceivePagination = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.solid_salt_receipt ORDER BY date_action desc limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getSolidSaltListReceivePaginationWithOutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
  }
) => {
  try {
    const { page, offset } = input;
    const sql = `SELECT * FROM ${DB}.solid_salt_receipt where stock != 0 ORDER BY date_action desc limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowSolidSaltListReceive = async (connection: Connection) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.solid_salt_receipt;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};
export const getAllRowSolidSaltListReceiveWithOutEmpty = async (
  connection: Connection
) => {
  try {
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.solid_salt_receipt  where stock != 0;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const searchSolidSaltListReceivePaginationWithOutEmpty = async (
  connection: Connection,
  input: {
    page: number;
    offset: number;
    search?: string;
  }
) => {
  try {
    const { page, offset, search } = input;
    const sql = !!search
      ? `SELECT * FROM ${DB}.solid_salt_receipt where customer like '%${search}%' or 
    product_name like '%${search}%' or no like '%${search}%' and stock != 0 ORDER BY date_action desc limit ${
          page * offset
        }, ${offset}`
      : `SELECT * FROM ${DB}.solid_salt_receipt where stock != 0 ORDER BY date_action desc limit ${
          page * offset
        }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const searchAllRowSolidSaltListReceiveWithOutEmpty = async (
  connection: Connection,
  input: {
    search?: string;
  }
) => {
  try {
    const { search } = input;
    const sql = !!search
      ? `SELECT  COUNT(*) as allRows FROM ${DB}.solid_salt_receipt  
    where customer like '%${search}%' or product_name like '%${search}%' or no like '%${search}%' and stock != 0;`
      : `SELECT  COUNT(*) as allRows FROM ${DB}.solid_salt_receipt  
    where  stock != 0;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};
export const fillterReceiveSolidSalt = async (
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
    const sql = `SELECT * FROM ${DB}.solid_salt_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const insertLogSolidSaltStockReceive = async (
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
    const sql = `INSERT INTO ${DB}.log_solid_salt_receipt (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getReceiveSolidSaltByOrderId = async (
  connection: Connection,
  input: {
    order_id: number;
  }
) => {
  try {
    const { order_id } = input;
    const sql = `SELECT * FROM  ${DB}.log_solid_salt_receipt 
    inner join (SELECT idsolid_salt_receipt, no, product_name,weigh_net, stock FROM  ${DB}.solid_salt_receipt) receipe_table on receipe_table.idsolid_salt_receipt = log_solid_salt_receipt.receipt_target 
    where order_target = ${order_id};`;

    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const updateStockSolidSaltService = async (
  connection: Connection,
  input: {
    new_stock: number;
    idreceipt: number;
  }
) => {
  try {
    const { new_stock, idreceipt } = input;
    const sql = `UPDATE ${DB}.solid_salt_receipt SET stock = stock-${new_stock} WHERE idsolid_salt_receipt = ${idreceipt};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

// query customer
export const getCustomerByBill = async (
  connection: Connection,
  input: {
    type_bill: number;
  }
) => {
  try {
    const { type_bill } = input;
    const sql = `SELECT * FROM ${DB}.customer_bill where type_bill=${type_bill};`;

    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getCustomerByBillPagination = async (
  connection: Connection,
  input: {
    type_bill: number;
    page: number;
    offset: number;
  }
) => {
  try {
    const { type_bill, page, offset } = input;
    const sql = `SELECT * FROM ${DB}.customer_bill where type_bill=${type_bill} limit ${
      page * offset
    }, ${offset}`;
    const result = await Query(connection, sql);
    return result;
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const getAllRowCustomerByBill = async (
  connection: Connection,
  input: {
    type_bill: number;
  }
) => {
  try {
    const { type_bill } = input;
    const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.customer_bill where type_bill=${type_bill} ;`;
    const result = await Query(connection, sql);
    return result as IAllRows[];
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const insertCustomer = async (
  connection: Connection,
  input: {
    type_bill: number;
    name: string;
  }
) => {
  try {
    const { type_bill, name } = input;
    const sql = `INSERT INTO ${DB}.customer_bill (type_bill, name) VALUES (${type_bill}, '${name}');`;

    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad query : ${e}`);
  }
};

export const deleteCustomerBil = async (
  connection: Connection,
  input: { idcustomer_bill: number }
) => {
  try {
    const { idcustomer_bill } = input;
    const sql = `DELETE FROM ${DB}.customer_bill where idcustomer_bill=${idcustomer_bill};`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e) {
    throw new Error("bad request");
  }
};
