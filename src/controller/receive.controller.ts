import { Request, Response } from "express";
import {
  fillterReceiveFiashSauce,
  fillterReceiveSalt,
  fillterReceiveWeightFish,
  getAllReceiveFishWeight,
  getAllRowFiashSauceListReceive,
  getAllRowListReceive,
  getAllRowSaltListReceive,
  getFiashSauceListReceivePagination,
  getListReceivePagination,
  getReceiveFiashSauceByOrderId,
  getReceiveSaltByOrderId,
  getReceiveWeightFishById,
  getReceiveWeightFishByOrderId,
  getSaltListReceivePagination,
  insertLogStockReceive,
  insertRecieveFiashSauceBill,
  insertRecieveFishWeightBill,
  insertRecieveSaltBill,
  updateOrderConnect,
  updateStockService,
} from "../service/receive.service";
import { Connect, DisConnect } from "../utils/connect";
import logger from "../utils/logger";

export const createFishWeightBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      weigh_net,
      price_per_weigh,
      amount_price,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveFishWeightBill(connection, {
      no,
      weigh_net,
      price_per_weigh,
      amount_price,
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
export const getReceiveWeightFishByOrdersIdTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { order_id } = req.params;
    const connection = await Connect();
    const result = await getReceiveWeightFishByOrderId(connection, {
      order_id: parseInt(order_id),
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
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
    } = req.body;
    const connection = await Connect();
    const result = await fillterReceiveWeightFish(connection, {
      no,
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
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

export const getReceiveFishWeightPaginationTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });
    const countList = await getAllRowListReceive(connection);
    const responseData = {
      data: list,
      total: countList[0].allRows,
    };
    await DisConnect(connection);
    return res.status(200).send(responseData);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateStockTask = async (req: Request, res: Response) => {
  try {
    const { new_stock, idreceipt, order_target, id_puddle } = req.body;
    const connection = await Connect();
    await updateStockService(connection, {
      new_stock,
      idreceipt,
    });
    const response = await insertLogStockReceive(connection, {
      new_stock,
      idreceipt,
      order_target,
      id_puddle,
    });

    await DisConnect(connection);
    return res.status(200).send(response);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

// salt receipt
export const createSaltBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveSaltBill(connection, {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getReceiveSaltBillPaginationTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getSaltListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });
    const countList = await getAllRowSaltListReceive(connection);
    const responseData = {
      data: list,
      total: countList[0].allRows,
    };
    await DisConnect(connection);
    return res.status(200).send(responseData);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const fillterReceiveSaltTask = async (req: Request, res: Response) => {
  try {
    const { no, weigh_net, customer_name, product_name, stock } = req.body;
    const connection = await Connect();
    const result = await fillterReceiveSalt(connection, {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getLogReceiveSaltByOrdersIdTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { order_id } = req.params;
    if (order_id.toString() === "null") {
      return res.status(200).send([]);
    } else {
      const connection = await Connect();
      const result = await getReceiveSaltByOrderId(connection, {
        order_id: parseInt(order_id),
      });
      await DisConnect(connection);
      return res.status(200).send(result);
    }
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

// ------------------------ fish sauce receipt ------------------------

export const createFiashSauceBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveFiashSauceBill(connection, {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getReceiveFiashSauceBillPaginationTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getFiashSauceListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });
    const countList = await getAllRowFiashSauceListReceive(connection);
    const responseData = {
      data: list,
      total: countList[0].allRows,
    };
    await DisConnect(connection);
    return res.status(200).send(responseData);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const fillterReceiveFiashSauceTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { no, weigh_net, customer_name, product_name, stock } = req.body;
    const connection = await Connect();
    const result = await fillterReceiveFiashSauce(connection, {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getLogReceiveFiashSauceByOrdersIdTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { order_id } = req.params;
    const connection = await Connect();
    const result = await getReceiveFiashSauceByOrderId(connection, {
      order_id: parseInt(order_id),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
