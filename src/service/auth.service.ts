import { IInsertUser } from "../types/auth";
import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import resp from "../utils/response";
import getUserUUID from "../utils/getUUID";
// import expressJwt from "express-jwt";
dotenv.config();

const DB = config.get<any>("database");

export const insertUser = async (
  connection: Connection,
  input: IInsertUser
) => {
  try {
    const { role, phone, name, password, email } = input;
    const sqlCheckPhoneUser = `SELECT * FROM ${DB}.users where phone = '${phone}';`;
    const sqlCheckEmailUser = `SELECT * FROM ${DB}.users where email = '${email}';`;

    const checkDuplicatePhone: any = await Query(connection, sqlCheckPhoneUser);
    const checkDuplicateEmail: any = await Query(connection, sqlCheckEmailUser);
    if (checkDuplicatePhone.length > 0 || checkDuplicateEmail.length > 0) {
      return "DULICATE_USER";
    } else {
      const passwordHash = bcrypt.hashSync(password, 10);

      let queryInsert = `INSERT INTO ${DB}.users (uuid, role, phone, name, password) 
        values (UUID(), '${
          role ? role : 0
        }','${phone}','${name}','${passwordHash}') ;`;

      const data = await Query(connection, queryInsert);
      if (data) {
        return resp(true, "CREATE_USER_SUCCESS");
      } else {
        return resp(false, "CRASH");
      }
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const signInService = async (
  connection: Connection,
  input: { userName: string; password: string }
) => {
  try {
    const { userName, password } = input;
    const sql = `SELECT * FROM ${DB}.users where phone = '${userName}' OR email = '${userName}';`;
    const data: any = await Query(connection, sql);
    if (data.length > 0) {
      const isCorrect = bcrypt.compareSync(password, data[0].password);
      if (isCorrect) {
        const token = jwt.sign(
          {
            idusers: data[0].idusers,
            uuid: data[0].uuid,
            phone: data[0].phone,
            role: data[0].role,
            iat: Math.floor((new Date() as any) / 1000),
          },
          process.env.SECRET_JWT as string
        );
        return resp(true, {
          idusers: data[0].idusers,
          uuid: data[0].uuid,
          phone: data[0].phone,
          role: data[0].role,
          token: token,
        });
      } else {
        return resp(false, "PASSWORD_DONT_MATCH");
      }
    } else {
      return resp(false, "DONT_FIND_USER");
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getUserInfo = async (connection: Connection, input: string) => {
  try {
    let sql = `SELECT * FROM ${DB}.users where uuid = '${input}';`;
    const data: any = await Query(connection, sql);
    return resp(true, data);
  } catch (e: any) {
    throw new Error(e);
  }
};
