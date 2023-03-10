import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";

import dotenv from "dotenv";
import resp from "../utils/response";
import { ICreatePuddle, IUpdateDetailPuddle } from "../types/product";
import { LargeNumberLike } from "crypto";

dotenv.config();

const DB = config.get<any>("database");

export const insertPuddle = async (
  connection: Connection,
  input: ICreatePuddle
) => {
  try {
    const { building_id, serial } = input;
    const sql = `INSERT INTO ${DB}.puddle (uuid_puddle, building_id, serial) values (UUID(), ${building_id}, '${serial}') ; `;
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

export const getDetailPuddleById = async (
  connection: Connection,
  input: { puddle_id: number }
) => {
  try {
    const { puddle_id } = input;
    const sql = `SELECT * FROM ${DB}.puddle where idpuddle=${puddle_id}`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    return resp(false, "APP_CRASH");
  }
};

export const createOrder = async (
  connection: Connection,
  input: { order_name: string; puddle_id: number; userId: number }
) => {
  try {
    const { order_name, puddle_id, userId } = input;
    const sql = `INSERT INTO ${DB}.orders (uuid_order, order_name, user_create, puddle_owner) values (UUID(), '${order_name}', ${userId} ,${puddle_id}); `;
    const queryInsertOrder: any = await Query(connection, sql);
    return queryInsertOrder.insertId;
  } catch (e: any) {
    return resp(false, e);
  }
};

export const updatePuddleOrderLasted = async (
  connection: Connection,
  input: {
    uuid_puddle: string;
    orderId: number;
    status: number;
    description: string;
  }
) => {
  try {
    const { uuid_puddle, orderId, status, description } = input;
    const sql = `UPDATE ${DB}.puddle SET lasted_order=${orderId}, status=${status}, description='${description}' WHERE uuid_puddle='${uuid_puddle}' ; `;
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
    volume: number;
    fish_price: number;
    salt_price: number;
    laber_price: number;
    amount_unit_per_price: number;
    amount_price: number;
    amount_items: number;
    remaining_volume: number;
  }
) => {
  try {
    const {
      orderId,
      fish,
      salt,
      laber,
      description,
      userId,
      volume,
      fish_price,
      salt_price,
      laber_price,
      amount_unit_per_price,
      amount_price,
      amount_items,
      remaining_volume,
    } = input;

    const sql = `INSERT INTO ${DB}.sub_orders (idOrders, fish, salt, laber, description, user_create_sub, amount_items, volume,
      fish_price,salt_price, laber_price,amount_unit_per_price,amount_price,remaining_items,remaining_volume) values (${orderId}, ${fish},${salt},${laber},'${description}',${userId}, ${amount_items}, ${volume}, ${fish_price}, ${salt_price},${laber_price},${amount_unit_per_price},${amount_price}, ${amount_items}, ${remaining_volume});`;
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
    return resp(false, []);
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
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const transferSidhsauce = async (
  connection: Connection,
  input: {
    order_id: number;
    type_process: number;
    amount_items: number;
    amount_unit_per_price: number;
    amount_price: number;
    remaining_items: number;
    remaining_unit_per_price: number;
    remaining_price: number;
    approved: number;
    volume: number;
    user_create_sub: number;
    remaining_volume: number;
    action_puddle: number;
    action_serial_puddle: number;
  }
) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      user_create_sub,
      remaining_volume,
      action_puddle,
      action_serial_puddle,
    } = input;
    const sql = `INSERT INTO ${DB}.sub_orders (idOrders, type, amount_items, amount_unit_per_price, 
      amount_price, remaining_items, remaining_unit_per_price, remaining_price, 
      approved, volume, user_create_sub, remaining_volume, action_puddle, action_serial_puddle ) 
    values (${order_id}, ${type_process}, ${amount_items}, ${amount_unit_per_price}, 
      ${amount_price}, ${remaining_items}, ${remaining_unit_per_price}, ${remaining_price}, 
      ${approved}, ${volume}, ${user_create_sub}, ${remaining_volume}, ${action_puddle}, ${action_serial_puddle});`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const insertTargetPuddle = async (
  connection: Connection,
  input: {
    id_puddle: number;
    id_sub_order: number;
    status: number;
    source_puddle: number;
    source_serial_puddle: number;
    serial_puddle?: number;
  }
) => {
  try {
    const {
      id_puddle,
      id_sub_order,
      status = 0,
      source_puddle,
      source_serial_puddle,
      serial_puddle,
    } = input;
    const sql = `INSERT INTO ${DB}.target_puddle (id_puddle, id_sub_order, status, source_puddle, source_serial_puddle, serial_puddle) values (${id_puddle}, ${id_sub_order}, ${status}, ${source_puddle},${source_serial_puddle}, ${serial_puddle});`;
    await Query(connection, sql);

    return resp(true, "INSERT_SUCCESS");
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const getAllOrderFromPuddle = async (
  connection: Connection,
  input: {
    id_puddle: number;
  }
) => {
  try {
    const { id_puddle } = input;
    const sql = ` SELECT * FROM ${DB}.orders where puddle_owner=${id_puddle} order by idorders desc ;`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const getTargetPending = async (
  connection: Connection,
  input: {
    id_puddle: number;
    status: number;
  }
) => {
  try {
    const { id_puddle, status } = input;
    const sql = `SELECT * FROM ${DB}.target_puddle
    inner join (SELECT * FROM jaw_production_process.sub_orders) sub_orders ON target_puddle.id_sub_order = sub_orders.idsub_orders
    where id_puddle = ${id_puddle} and status = ${status}
    ;`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const submitImportFish = async (
  connection: Connection,
  input: {
    id_puddle: number;
    status: number;
  }
) => {
  try {
    const { id_puddle, status } = input;
    const sql = `SELECT * FROM ${DB}.target_puddle
      inner join (SELECT * FROM jaw_production_process.sub_orders) sub_orders ON target_puddle.id_sub_order = sub_orders.idsub_orders
      where id_puddle = ${id_puddle} and status = ${status}
      ;`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const updateStatusTargetPuddle = async (
  connection: Connection,
  input: {
    idtarget_puddle: number;
    status: number;
  }
) => {
  try {
    const { idtarget_puddle, status } = input;
    const sql = `UPDATE ${DB}.target_puddle set status=${status} where idtarget_puddle = ${idtarget_puddle};`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const updateStatusApprovedSubOrder = async (
  connection: Connection,
  input: {
    idsub_orders: number;
    approved: number;
  }
) => {
  try {
    const { idsub_orders, approved } = input;
    const sql = `UPDATE ${DB}.sub_orders set approved=${approved} where idsub_orders=${idsub_orders};`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const deleteTargetPuddleById = async (
  connection: Connection,
  input: {
    idtarget_puddle: number;
  }
) => {
  try {
    const { idtarget_puddle } = input;
    const sql = `DELETE FROM  ${DB}.target_puddle where idtarget_puddle=${idtarget_puddle};`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const deleteSubOrderById = async (
  connection: Connection,
  input: {
    id_sub_order: number;
  }
) => {
  try {
    const { id_sub_order } = input;
    const sql = `DELETE FROM  ${DB}.sub_orders where idsub_orders=${id_sub_order};`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const getSerialPuddle = async (
  connection: Connection,
  input: {
    idpuddle: number;
  }
) => {
  try {
    const { idpuddle } = input;
    const sql = `SELECT serial FROM ${DB}.puddle where idpuddle=${idpuddle};`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e: any) {
    console.log(e);
    return resp(false, "APP_CRASH");
  }
};

export const getAllTypeProcess = async (connection: Connection) => {
  try {
    const sql = `SELECT * FROM  ${DB}.type_process;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e) {
    throw new Error("bad request");
  }
};
