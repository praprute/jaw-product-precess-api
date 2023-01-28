import mysql from "mysql";
import config from "config";
import log from "./logger";

import dotenv from "dotenv";
dotenv.config();

const params = {
  host: config.get<any>("host"),
  user: config.get<any>("user"),
  password: config.get<any>("password"),
  port: config.get<number>("db_port"),
  database: config.get<any>("database"),
  dateStrings: config.get<any>("dateStrings"),
  timezone: config.get<any>("timezone"),
};

const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(connection);
    });
  });

const Query = async (connection: mysql.Connection, query: string) =>
  new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      log.info(query);
      resolve(result);
    });
  });

const DisConnect = async (connection: mysql.Connection) => {
  connection.end(function (error) {
    if (error) {
      log.error(error);
    }
  });
};

export { Connect, Query, DisConnect };
