import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";
import dotenv from "dotenv";
import resp from "../utils/response";
import log from "../utils/logger";

dotenv.config();

const DB = config.get<any>("database");

export const getAllWorkingStatus = async (connection: Connection) => {
  try {
    const sql = `SELECT * FROM  ${DB}.working_status;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e) {
    log.error(e);
    throw new Error("bad request");
  }
};

export const insertWorkingStatus = async (
  connection: Connection,
  input: { title: string; color: string }
) => {
  try {
    const { title, color } = input;
    const sql = `INSERT INTO  ${DB}.working_status (title, color) VALUES ('${title}', '${color}');`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e) {
    log.error(e);
    throw new Error("bad request");
  }
};

export const deleteWorkingStatusService = async (
  connection: Connection,
  input: { idworking_status: number }
) => {
  try {
    const { idworking_status } = input;
    const sql = `DELETE FROM ${DB}.working_status where idworking_status=${idworking_status};`;
    const result = await Query(connection, sql);

    return resp(true, result);
  } catch (e) {
    log.error(e);
    throw new Error("bad request");
  }
};
