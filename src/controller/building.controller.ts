import { Request, Response } from "express";
import {
  deleteBuilding,
  getAllBuilding,
  getCountingPuddleFromBuilding,
  insertBuilding,
  updateLimitBuilding,
} from "../service/building.service";
import { Connect, DisConnect } from "../utils/connect";
import logger from "../utils/logger";

export const createBuildingTask = async (req: Request, res: Response) => {
  try {
    const { name, limit_pool } = req.body;
    const connection = await Connect();
    const result = await insertBuilding(connection, { name, limit_pool });
    await DisConnect(connection);
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
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getCountingPuddleFromBuildingTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { building_id } = req.params;
    const connection = await Connect();
    const result = await getCountingPuddleFromBuilding(connection, {
      building_id: Number(building_id),
    });
    await DisConnect(connection);
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
    await DisConnect(connection);
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
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
