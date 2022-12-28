import { Request, Response } from "express";
import { number } from "zod";
import {
  createOrder,
  createSubOrder,
  getAllPuddle,
  getOrderDetails,
  insertPuddle,
  updateAmountPriceOrder,
  updateDetailPuddle,
  updatePriceSubOrder,
  updatePuddleOrderLasted,
} from "../service/product.service";
import { Connect } from "../utils/connect";
import getUserUUID, { IUserPareToken } from "../utils/getUUID";
import logger from "../utils/logger";

export const createPuddleTask = async (req: Request, res: Response) => {
  try {
    const { building_id } = req.body;
    const connection = await Connect();
    const result = await insertPuddle(connection, { building_id });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateDetailPuddleTask = async (req: Request, res: Response) => {
  try {
    const { building_id, status, uuid_puddle } = req.body;
    const connection = await Connect();
    const result = await updateDetailPuddle(connection, {
      building_id,
      status,
      uuid_puddle,
    });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getAllPuddleTask = async (req: Request, res: Response) => {
  try {
    const { building_id } = req.params;
    const connection = await Connect();
    const result = await getAllPuddle(connection, {
      building_id: parseInt(building_id),
    });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const createOrderTask = async (req: Request, res: Response) => {
  try {
    const { order_name, uuid_puddle, fish, salt, laber, description } =
      req.body;
    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    const queryInsertOrder = await createOrder(connection, {
      order_name,
      userId: getDataUser.idusers,
    });

    await updatePuddleOrderLasted(connection, {
      orderId: queryInsertOrder,
      uuid_puddle,
      status: 1,
    });

    const queryCreateSubOrder = await createSubOrder(connection, {
      orderId: queryInsertOrder,
      userId: getDataUser.idusers,
      fish,
      salt,
      laber,
      description,
    });

    return res.status(200).send(queryCreateSubOrder);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getOrderDetailsTask = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.params;
    const connection = await Connect();
    const result = await getOrderDetails(connection, {
      order_id: parseInt(order_id),
    });
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updatePriceSubOrderTask = async (req: Request, res: Response) => {
  try {
    const {
      fish_price,
      salt_price,
      laber_price,
      amount_items,
      idsub_orders,
      uuid_order,
    } = req.body;
    const connection = await Connect();

    await updatePriceSubOrder(connection, {
      fish_price,
      salt_price,
      laber_price,
      amount_unit_per_price:
        (fish_price + salt_price + laber_price) / amount_items,
      amount_price: fish_price + salt_price + laber_price,
      idsub_orders,
    });

    const result = await updateAmountPriceOrder(connection, {
      amount: amount_items,
      unit_per_price: (fish_price + salt_price + laber_price) / amount_items,
      price: fish_price + salt_price + laber_price,
      uuid_order: uuid_order,
    });

    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
