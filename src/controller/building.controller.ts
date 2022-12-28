import { Request, Response } from "express";
import {
  deleteBuilding,
  getAllBuilding,
  insertBuilding,
  updateLimitBuilding,
} from "../service/building.service";
import { Connect } from "../utils/connect";
import logger from "../utils/logger";

export const createBuildingTask = async (req: Request, res: Response) => {
  try {
    const { name, limit_pool } = req.body;
    const connection = await Connect();
    const result = await insertBuilding(connection, { name, limit_pool });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getBuildingTask = async (req: Request, res: Response) => {
  try {
    const connection = await Connect();
    const result = await getAllBuilding(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteBuildingTask = async (req: Request, res: Response) => {
  try {
    const { idbuilding } = req.body;
    const connection = await Connect();
    const result = await deleteBuilding(connection, { idbuilding });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateBuildingTask = async (req: Request, res: Response) => {
  try {
    const { idbuilding, name, limit_pool } = req.body;
    const connection = await Connect();
    const result = await updateLimitBuilding(connection, {
      idbuilding,
      name,
      limit_pool,
    });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
