import { Request, Response } from "express";
import {
  deleteWorkingStatusService,
  getAllWorkingStatus,
  insertWorkingStatus,
} from "../service/setting.service";
import { Connect, DisConnect } from "../utils/connect";
import logger from "../utils/logger";

export const getListWorkingStatus = async (req: Request, res: Response) => {
  try {
    const connection = await Connect();
    const result = await getAllWorkingStatus(connection);
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const createWorkingStatus = async (req: Request, res: Response) => {
  try {
    const { title, color } = req.body;
    const connection = await Connect();
    const result = await insertWorkingStatus(connection, { title, color });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteWorkingStatus = async (req: Request, res: Response) => {
  try {
    const idworking_status = req.params.idworking_status;
    const connection = await Connect();
    const result = await deleteWorkingStatusService(connection, {
      idworking_status: Number(idworking_status),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
