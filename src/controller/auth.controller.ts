import { Request, Response } from "express";
import { IInsertUser } from "../types/auth";
import {
  signInService,
  insertUser,
  getUserInfo,
} from "../service/auth.service";
import { Connect } from "../utils/connect";
import logger from "../utils/logger";
import getUserUUID from "../utils/getUUID";

export const createUserTask = async (req: Request, res: Response) => {
  try {
    const { role, phone, name, password } = req.body;
    const connection = await Connect();
    const result = await insertUser(connection, {
      role,
      phone,
      name,
      password,
    } as IInsertUser);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const signInTask = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    const connection = await Connect();
    const result = await signInService(connection, {
      phone,
      password,
    });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getUserInfoTask = async (req: Request, res: Response) => {
  try {
    const connection = await Connect();
    const getUserId = await getUserUUID(req.headers.authorization as string);
    const result = await getUserInfo(connection, getUserId.uuid);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
