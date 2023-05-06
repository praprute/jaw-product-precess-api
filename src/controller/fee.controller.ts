import { Request, Response } from "express";
import {
  getAllLaborPriceFerment,
  getAllLaborPricePerBuilding,
  getAllLaborPricePerBuildingByBuilding,
  insertLaborPriceFerment,
  insertLaborPricePerBuilding,
  updateLaborPriceFerment,
  updateLaborPricePerBuilding,
} from "../service/fee.service";
import { Connect, DisConnect } from "../utils/connect";
import logger from "../utils/logger";

export const createFeeLaborPerBuilding = async (
  req: Request,
  res: Response
) => {
  try {
    const { building_id, price } = req.body;
    const connection = await Connect();
    const result = await insertLaborPricePerBuilding(connection, {
      building_id,
      price,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const createFeeLaborFerMent = async (req: Request, res: Response) => {
  try {
    const { price } = req.body;
    const connection = await Connect();
    const result = await insertLaborPriceFerment(connection, {
      price,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateFeeLaborPerBuilding = async (
  req: Request,
  res: Response
) => {
  try {
    const { id_price, price } = req.body;
    const connection = await Connect();
    const result = await updateLaborPricePerBuilding(connection, {
      id_price,
      price,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateFeeLaborFerment = async (req: Request, res: Response) => {
  try {
    const { id_price, price } = req.body;
    const connection = await Connect();
    const result = await updateLaborPriceFerment(connection, {
      id_price,
      price,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getAllFeeLaborPerBuilding = async (
  req: Request,
  res: Response
) => {
  try {
    const connection = await Connect();
    const result = await getAllLaborPricePerBuilding(connection);
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getFeeLaborPerBuildingByBuilding = async (
  req: Request,
  res: Response
) => {
  try {
    const { id_building } = req.params;
    const connection = await Connect();
    const result = await getAllLaborPricePerBuildingByBuilding(connection, {
      id_building: Number(id_building),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getAllFeeLaborFerment = async (req: Request, res: Response) => {
  try {
    const connection = await Connect();
    const result = await getAllLaborPriceFerment(connection);
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
