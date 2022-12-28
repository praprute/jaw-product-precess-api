import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";

import dotenv from "dotenv";
import resp from "../utils/response";

import { IBuilding } from "../types/building";
dotenv.config();

const DB = config.get<any>("database");

export const insertBuilding = async (
  connection: Connection,
  input: IBuilding
) => {
  try {
    const { name, limit_pool } = input;
    const sql = `INSERT INTO ${DB}.building (name , limit_pool) values ('${name}' , ${limit_pool}) ; `;
    const result: any = await Query(connection, sql);
    if (result.insertId) {
      return resp(true, "CREATE_SUCCESS");
    } else {
      return resp(false, "APP_CRASH");
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getAllBuilding = async (connection: Connection) => {
  try {
    const sql = `SELECT * FROM ${DB}.building; `;
    const result: any = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteBuilding = async (
  connection: Connection,
  input: { idbuilding: number }
) => {
  try {
    const { idbuilding } = input;
    const sql = `DELETE FROM ${DB}.building WHERE idbuilding=${idbuilding} ; `;
    const result: any = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateLimitBuilding = async (
  connection: Connection,
  input: { idbuilding: number; name: string; limit_pool: number }
) => {
  try {
    const { name, idbuilding, limit_pool } = input;
    const sql = `UPDATE ${DB}.building SET name = '${name}', limit_pool=${limit_pool} WHERE idbuilding=${idbuilding} ; `;
    const result: any = await Query(connection, sql);
    return resp(true, 'UPDATE_SUCCESS');
  } catch (e: any) {
    throw new Error(e);
  }
};
