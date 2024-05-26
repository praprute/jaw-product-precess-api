import { Request, Response } from "express";
import {
  deleteCustomerBil,
  fillterReceiveAmpan,
  fillterReceiveFiashSauce,
  fillterReceiveFishy,
  fillterReceiveSalt,
  fillterReceiveSolidSalt,
  fillterReceiveWeightFish,
  getAllAmpanSauceListReceiveWithOutEmpty,
  getAllFishyListReceiveWithOutEmpty,
  getAllReceiveFishWeight,
  getAllRowAmpanListReceive,
  getAllRowCustomerByBill,
  getAllRowFiashSauceListReceive,
  getAllRowFiashSauceListReceiveWithOutEmpty,
  getAllRowFishyListReceive,
  getAllRowListReceive,
  getAllRowListReceiveWithoutEmpty,
  getAllRowSaltListReceive,
  getAllRowSaltListReceiveWithOutEmpty,
  getAllRowSolidSaltListReceive,
  getAllRowSolidSaltListReceiveWithOutEmpty,
  getAmpanListReceivePagination,
  getAmpanListReceivePaginationWithOutEmpty,
  getCustomerByBill,
  getCustomerByBillPagination,
  getFiashSauceListReceivePagination,
  getFiashSauceListReceivePaginationWithOutEmpty,
  getFishyListReceivePagination,
  getFishyListReceivePaginationWithOutEmpty,
  getListReceivePagination,
  getListReceivePaginationWithoutEmpty,
  getListReceiveReport,
  getReceiveAmpanByOrderId,
  getReceiveFiashSauceByOrderId,
  getReceiveFishyByOrderId,
  getReceiveSaltByOrderId,
  getReceiveWeightFishById,
  getReceiveWeightFishByOrderId,
  getSaltListReceivePagination,
  getSaltListReceivePaginationWithOutEmpty,
  getSolidSaltListReceivePagination,
  getSolidSaltListReceivePaginationWithOutEmpty,
  insertCustomer,
  insertLogSolidSaltStockReceive,
  insertLogStockReceive,
  insertRecieveAmpanBill,
  insertRecieveFiashSauceBill,
  insertRecieveFishWeightBill,
  insertRecieveFishyBill,
  insertRecieveSaltBill,
  insertRecieveSolidSaltBill,
  searchAllRowListReceiveWithoutEmpty,
  searchAllRowSolidSaltListReceiveWithOutEmpty,
  searchListReceivePaginationWithoutEmpty,
  searchSolidSaltListReceivePaginationWithOutEmpty,
  updateOrderConnect,
  updateStockService,
  updateStockSolidSaltService,
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
      date_action,
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
      date_action,
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

export const getReceiveFishWeightReportTask = async (
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
      dateStart,
      dateEnd,
    } = req.body;
    const connection = await Connect();
    const list = await getListReceiveReport(connection, {
      no,
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
      dateStart,
      dateEnd,
    });

    const responseData = {
      data: list,
    };
    await DisConnect(connection);
    return res.status(200).send(responseData);
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
    const {
      no,
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
      dateStart,
      dateEnd,
    } = req.body;
    const connection = await Connect();
    const list = await getListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
      no,
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
      dateStart,
      dateEnd,
    });
    const countList = await getAllRowListReceive(connection, {
      no,
      weigh_net,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      stock,
      dateStart,
      dateEnd,
    });
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

export const getReceiveFishWeightPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getListReceivePaginationWithoutEmpty(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });
    const countList = await getAllRowListReceiveWithoutEmpty(connection);
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

export const searchReceiveFishWeightPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset, search } = req.body;
    const connection = await Connect();
    const list = await searchListReceivePaginationWithoutEmpty(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
      search: search?.toString() || null,
    });
    const countList = await searchAllRowListReceiveWithoutEmpty(connection, {
      search: search?.toString() || null,
    });
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

// ------------------------ solid salt receipt ------------------------

export const createSolidSaltBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveSolidSaltBill(connection, {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getReceiveSolidSaltBillPaginationTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getSolidSaltListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });
    const countList = await getAllRowSolidSaltListReceive(connection);
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

export const getReceiveSolidSaltBillPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getSolidSaltListReceivePaginationWithOutEmpty(
      connection,
      {
        page: parseInt(page),
        offset: parseInt(offset),
      }
    );
    const countList = await getAllRowSolidSaltListReceiveWithOutEmpty(
      connection
    );
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

export const searchReceiveSolidSaltPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset, search } = req.body;
    const connection = await Connect();
    const list = await searchSolidSaltListReceivePaginationWithOutEmpty(
      connection,
      {
        page: parseInt(page),
        offset: parseInt(offset),
        search: search?.toString() || null,
      }
    );
    const countList = await searchAllRowSolidSaltListReceiveWithOutEmpty(
      connection,
      {
        search: search?.toString() || null,
      }
    );
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

export const fillterReceiveSolidSaltTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { no, weigh_net, customer_name, product_name, stock } = req.body;
    const connection = await Connect();
    const result = await fillterReceiveSolidSalt(connection, {
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

export const getLogReceiveSolidSaltByOrdersIdTask = async (
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

export const updateStockSolidSaltTask = async (req: Request, res: Response) => {
  try {
    const { new_stock, idreceipt, order_target, id_puddle } = req.body;
    const connection = await Connect();
    await updateStockSolidSaltService(connection, {
      new_stock,
      idreceipt,
    });
    const response = await insertLogSolidSaltStockReceive(connection, {
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

// ------------------------ salt receipt ------------------------

export const createSaltBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveSaltBill(connection, {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
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

export const getReceiveSaltBillPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getSaltListReceivePaginationWithOutEmpty(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });
    const countList = await getAllRowSaltListReceiveWithOutEmpty(connection);
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
      date_action,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveFiashSauceBill(connection, {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
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
    const {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = req.body;

    const connection = await Connect();

    const list = await getFiashSauceListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    });

    const countList = await getAllRowFiashSauceListReceive(connection, {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    });
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

export const getReceiveFiashSauceBillPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getFiashSauceListReceivePaginationWithOutEmpty(
      connection,
      {
        page: parseInt(page),
        offset: parseInt(offset),
      }
    );

    const countList = await getAllRowFiashSauceListReceiveWithOutEmpty(
      connection
    );
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

// ------------------------ ampan  receipt ------------------------

export const createAmpanBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveAmpanBill(connection, {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getReceiveAmpanBillPaginationTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = req.body;
    const connection = await Connect();
    const list = await getAmpanListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    });
    const countList = await getAllRowAmpanListReceive(connection, {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    });
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
export const getReceiveAmpanBillPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();

    const list = await getAmpanListReceivePaginationWithOutEmpty(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });

    const countList = await getAllAmpanSauceListReceiveWithOutEmpty(connection);

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

export const fillterReceiveAmpanTask = async (req: Request, res: Response) => {
  try {
    const { no, weigh_net, customer_name, product_name, stock } = req.body;
    const connection = await Connect();
    const result = await fillterReceiveAmpan(connection, {
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

export const getLogReceiveAmpanByOrdersIdTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { order_id } = req.params;
    const connection = await Connect();
    const result = await getReceiveAmpanByOrderId(connection, {
      order_id: parseInt(order_id),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

// ------------------------ fishy  receipt ------------------------

export const createFishyBillTask = async (req: Request, res: Response) => {
  try {
    const {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
    } = req.body;
    const connection = await Connect();
    const result = await insertRecieveFishyBill(connection, {
      no,
      product_name,
      weigh_net,
      price_per_weigh,
      price_net,
      customer,
      date_action,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getReceiveFishyBillPaginationTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    } = req.body;
    const connection = await Connect();
    const list = await getFishyListReceivePagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    });
    const countList = await getAllRowFishyListReceive(connection, {
      no,
      weigh_net,
      customer_name,
      product_name,
      stock,
      dateStart,
      dateEnd,
    });
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
export const getReceiveFishyBillPaginationWithOutEmptyTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset } = req.params;
    const connection = await Connect();
    const list = await getFishyListReceivePaginationWithOutEmpty(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
    });

    const countList = await getAllFishyListReceiveWithOutEmpty(connection);
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

export const fillterReceiveFishyTask = async (req: Request, res: Response) => {
  try {
    const { no, weigh_net, customer_name, product_name, stock } = req.body;
    const connection = await Connect();
    const result = await fillterReceiveFishy(connection, {
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

export const getLogReceiveFishyByOrdersIdTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { order_id } = req.params;
    const connection = await Connect();
    const result = await getReceiveFishyByOrderId(connection, {
      order_id: parseInt(order_id),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

// ------- customer -------
export const getCustomerByBillTask = async (req: Request, res: Response) => {
  try {
    const { type_bill } = req.params;
    const connection = await Connect();
    const result = await getCustomerByBill(connection, {
      type_bill: parseInt(type_bill),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getCustomerByBillTaskPaginationTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { page, offset, type_bill } = req.params;
    const connection = await Connect();
    const list = await getCustomerByBillPagination(connection, {
      page: parseInt(page),
      offset: parseInt(offset),
      type_bill: parseInt(type_bill),
    });
    const countList = await getAllRowCustomerByBill(connection, {
      type_bill: parseInt(type_bill),
    });
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

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { type_bill, name } = req.body;
    const connection = await Connect();
    const result = await insertCustomer(connection, {
      type_bill: parseInt(type_bill),
      name: name,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const idcustomer_bill = req.params.idcustomer_bill;
    const connection = await Connect();
    const result = await deleteCustomerBil(connection, {
      idcustomer_bill: Number(idcustomer_bill),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
