import { Request, Response } from "express";
import {
  fillterReceiveWeightFish,
  getAllReceiveFishWeight,
  getReceiveWeightFishById,
  insertRecieveFishWeightBill,
  updateOrderConnect,
} from "../service/receive.service";
import { Connect, DisConnect } from "../utils/connect";
import logger from "../utils/logger";

export const createFishWeightBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      weigh_in,
      weigh_out,
      weigh_net,
      price_per_weigh,
      amount_price,
      time_in,
      time_out,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveFishWeightBill(connection, {
      no,
      weigh_in,
      weigh_out,
      weigh_net,
      price_per_weigh,
      amount_price,
      time_in,
      time_out,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getListReceiveWeightFishTask = async (res: Response) => {
  try {
    const connection = await Connect();
    const result = await getAllReceiveFishWeight(connection);
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getReceiveWeightFishByIdTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { idreceipt } = req.params;
    const connection = await Connect();
    const result = await getReceiveWeightFishById(connection, {
      idreceipt: parseInt(idreceipt),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const fillterReceiveWeightFishTask = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      no,
      weigh_in,
      weigh_out,
      weigh_net,
      time_in,
      time_out,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
    } = req.body;
    const connection = await Connect();
    const result = await fillterReceiveWeightFish(connection, {
      no,
      weigh_in,
      weigh_out,
      weigh_net,
      time_in,
      time_out,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateOrderConnectTask = async (req: Request, res: Response) => {
  try {
    const { order_connect, idreceipt } = req.body;
    const connection = await Connect();
    const result = await updateOrderConnect(connection, {
      order_connect,
      idreceipt,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
