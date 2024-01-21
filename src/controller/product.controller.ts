import { Request, Response } from "express";
import { updateWorkingStatusPuddle } from "../service/building.service";
import {
  addOnVolumn,
  changeVolumeForEitService,
  createOrder,
  createSubOrder,
  createTypeProcess,
  deleteFishTypeService,
  deleteSubOrderById,
  deleteTargetPuddleById,
  getAllFishType,
  getAllOrderFromPuddle,
  getAllPuddle,
  getAllTypeProcess,
  getDetailPuddleById,
  getLastedSubOrderByIdOrder,
  getOrderDetails,
  getSerialPuddle,
  getTargetPending,
  insertFishType,
  insertPuddle,
  insertSubOrderTypeClearAll,
  insertTargetPuddle,
  transferSidhsauce,
  updateAmountPriceOrder,
  updateChemOrder,
  updateDateStartFermant,
  updateDetailPuddle,
  updatePriceSubOrder,
  updatePuddleOrderLasted,
  updateStatusApprovedSubOrder,
  updateStatusTargetPuddle,
  updateStatusTopSalt,
  updateTimeActionPuddle,
  updateTypeProcessSubOrder,
  updateTypePuddle,
} from "../service/product.service";
import {
  insertLogAmpanStockReceive,
  insertLogFiashSauceStockReceive,
  insertLogFishyStockReceive,
  insertLogSaltStockReceive,
  updateStockAmpanService,
  updateStockFiashSauceService,
  updateStockFishyService,
  updateStockSaltService,
} from "../service/receive.service";
import { Connect, DisConnect } from "../utils/connect";
import getUserUUID, { IUserPareToken } from "../utils/getUUID";
import logger from "../utils/logger";
import { TypeOrderPuddle } from "../utils/type_utils";

export const createPuddleTask = async (req: Request, res: Response) => {
  try {
    const { building_id, serial } = req.body;
    const connection = await Connect();
    const result = await insertPuddle(connection, { building_id, serial });
    await DisConnect(connection);
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
    await DisConnect(connection);
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
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getDetailPuddleByIdTask = async (req: Request, res: Response) => {
  try {
    const { puddle_id } = req.params;
    const connection = await Connect();
    const result = await getDetailPuddleById(connection, {
      puddle_id: parseInt(puddle_id),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const createOrderTask = async (req: Request, res: Response) => {
  try {
    const {
      order_name,
      uuid_puddle,
      puddle_id,
      fish,
      salt,
      laber,
      volume,
      description,
      status_puddle_order,
      fish_price,
      salt_price,
      laber_price,
      amount_items,
      start_date,
      type_process = 0,
    } = req.body;
    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    const queryInsertOrder = await createOrder(connection, {
      order_name,
      puddle_id,
      userId: getDataUser.idusers,
    });

    await updatePuddleOrderLasted(connection, {
      orderId: queryInsertOrder,
      uuid_puddle,
      status: status_puddle_order,
      description,
    });

    const queryCreateSubOrder = await createSubOrder(connection, {
      orderId: queryInsertOrder,
      userId: getDataUser.idusers,
      fish,
      salt,
      laber,
      description,
      volume,
      fish_price,
      salt_price,
      laber_price,
      amount_unit_per_price:
        status_puddle_order === TypeOrderPuddle.FERMENT
          ? (fish_price + salt_price + laber_price) / fish
          : 0,
      amount_price: fish_price + salt_price + laber_price,
      amount_items:
        status_puddle_order === TypeOrderPuddle.FERMENT ? 100 : amount_items,
      remaining_volume: status_puddle_order === 1 ? volume : 0,
      start_date,
    });
    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: puddle_id,
      start_date,
      action_date: start_date,
    });
    await DisConnect(connection);
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
    await DisConnect(connection);
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
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getAllOrdersFromPuddleTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { id_puddle } = req.params;
    const connection = await Connect();
    const result = await getAllOrderFromPuddle(connection, {
      id_puddle: parseInt(id_puddle),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
/**
 * -type_process : 1 นำออก , 2 นำเข้า , 3 ถ่ายกาก
 */
export const exportFishSauceToNewPuddleTask = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved = 0,
      volume,
      id_puddle,
      remaining_volume,
      action_puddle,
      target_puddle,
      serial_puddle,
      process,
      date_action,
      round,
    } = req.body;
    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    const result = await transferSidhsauce(connection, {
      order_id,
      type_process : type_process === 14 ? 1 : type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      action_puddle: target_puddle,
      action_serial_puddle: serial_puddle,
      process,
      date_action,
      round,
    });

    await insertTargetPuddle(connection, {
      id_puddle: target_puddle,
      id_sub_order: result.message.insertId,
      status: 0,
      source_puddle: id_puddle,
      source_serial_puddle: action_puddle,
      serial_puddle,
      type_process
    });

    await updateTypePuddle(connection, {
      type_process: type_process === 14 ? 1 : type_process,
      idpuddle: id_puddle,
      round,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const exportSaltWaterToNewPuddleTask = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved = 0,
      volume,
      id_puddle,
      remaining_volume,
      action_puddle,
      target_puddle,
      serial_puddle,
      process,
      item_transfer,
      date_action,
      round,
    } = req.body;
    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    const result = await transferSidhsauce(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      action_puddle: target_puddle,
      action_serial_puddle: serial_puddle,
      process,
      date_action,
      round,
    });

    await insertTargetPuddle(connection, {
      id_puddle: target_puddle,
      id_sub_order: result.message.insertId,
      status: 0,
      source_puddle: id_puddle,
      source_serial_puddle: action_puddle,
      serial_puddle,
      item_transfer,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
      round,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const addOnSaltWaterTask = async (req: Request, res: Response) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      remaining_volume,
      process,
      new_stock,
      idreceipt,
      id_puddle,
      date_action,
    } = req.body;

    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    await addOnVolumn(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved: 1,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      process,
      date_action,
    });

    await insertLogSaltStockReceive(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
      order_target: order_id,
      id_puddle: id_puddle,
    });

    const result = await updateStockSaltService(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e);
  }
};

export const addOnFishyTask = async (req: Request, res: Response) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      remaining_volume,
      process,
      new_stock,
      idreceipt,
      id_puddle,
      date_action,
    } = req.body;

    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    await addOnVolumn(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price: !!amount_unit_per_price
        ? amount_unit_per_price
        : 0,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved: 1,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      process,
      date_action,
    });

    await insertLogFishyStockReceive(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
      order_target: order_id,
      id_puddle: id_puddle,
    });

    const result = await updateStockFishyService(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e);
  }
};

export const addOnAmpanTask = async (req: Request, res: Response) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      remaining_volume,
      process,
      new_stock,
      idreceipt,
      id_puddle,
      date_action,
    } = req.body;

    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    await addOnVolumn(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved: 1,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      process,
      date_action,
    });

    await insertLogAmpanStockReceive(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
      order_target: order_id,
      id_puddle: id_puddle,
    });

    const result = await updateStockAmpanService(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e);
  }
};

export const addOnNonePrice = async (req: Request, res: Response) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      remaining_volume,
      id_puddle,
      date_action,
    } = req.body;

    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    await addOnVolumn(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved: 1,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      date_action,
    });

    const result = await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });

    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e);
  }
};

export const addOnFishSauceWaterTask = async (req: Request, res: Response) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      remaining_volume,
      new_stock,
      idreceipt,
      id_puddle,
      date_action,
    } = req.body;

    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    await addOnVolumn(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved: 1,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      date_action,
    });

    await insertLogFiashSauceStockReceive(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
      order_target: order_id,
      id_puddle: id_puddle,
    });

    const result = await updateStockFiashSauceService(connection, {
      new_stock: new_stock,
      idreceipt: idreceipt,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e);
  }
};

export const getTargetPendingTask = async (req: Request, res: Response) => {
  try {
    const { id_puddle } = req.params;
    const connection = await Connect();
    const result = await getTargetPending(connection, {
      id_puddle: parseInt(id_puddle),
      status: 0,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const submitImportFishTask = async (req: Request, res: Response) => {
  try {
    const {
      volume,
      order_id,
      type_process,
      amount_items,
      amount_price,
      remaining_items,
      remaining_price,
      idtarget_puddle,
      lasted_subId,
      remaining_volume,
      action_puddle,
      action_serial_puddle,
      process,
      date_action,
      id_puddle,
      round,
    } = req.body;

    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    await transferSidhsauce(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price: amount_price / volume,
      amount_price,
      remaining_items,
      remaining_unit_per_price: remaining_price / remaining_volume,
      remaining_price,
      approved: 1,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      action_puddle,
      action_serial_puddle: action_serial_puddle,
      process,
      date_action,
      round,
    });

    await updateStatusTargetPuddle(connection, {
      idtarget_puddle,
      status: 1,
    });

    const result = await updateStatusApprovedSubOrder(connection, {
      idsub_orders: lasted_subId,
      approved: 1,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
      round,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });

    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const cancelGetInTask = async (req: Request, res: Response) => {
  try {
    const { id_sub_order, idtarget_puddle } = req.body;
    const connection = await Connect();

    await deleteTargetPuddleById(connection, {
      idtarget_puddle,
    });

    const result = await deleteSubOrderById(connection, { id_sub_order });
    await DisConnect(connection);

    if (result.success === "success") {
      return res.status(200).send({ success: result.success });
    } else {
      return res
        .status(500)
        .send({ success: "error", message: result.message });
    }
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getSerialPuddleTask = async (req: Request, res: Response) => {
  try {
    const { idpuddle } = req.params;
    const connection = await Connect();

    const result = await getSerialPuddle(connection, {
      idpuddle: parseInt(idpuddle),
    });

    await DisConnect(connection);

    if (result.success === "success") {
      return res
        .status(200)
        .send({ success: result.success, message: result.message });
    } else {
      return res
        .status(500)
        .send({ success: "error", message: result.message });
    }
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getAllTypeProcessTask = async (req: Request, res: Response) => {
  try {
    const connection = await Connect();
    const result = await getAllTypeProcess(connection);
    await DisConnect(connection);
    return res
      .status(200)
      .send({ success: result.success, message: result.message });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const createTypeProcessTask = async (req: Request, res: Response) => {
  try {
    const { process_name } = req.body;
    const connection = await Connect();
    const result = await createTypeProcess(connection, {
      process_name,
    });
    await DisConnect(connection);
    return res.status(200).send({ success: result.success });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const throwItemsInPuddleTask = async (req: Request, res: Response) => {
  try {
    const { process_name } = req.body;
    const connection = await Connect();
    const result = await createTypeProcess(connection, {
      process_name,
    });
    await DisConnect(connection);
    return res.status(200).send({ success: result.success });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateProcessDescritionSubOrderTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { process, subOrderId } = req.body;
    const connection = await Connect();
    const result = await updateTypeProcessSubOrder(connection, {
      process,
      subOrderId,
    });
    await DisConnect(connection);
    return res.status(200).send({ success: result.success });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const closeProcessTask = async (req: Request, res: Response) => {
  try {
    const {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      remaining_volume,
      date_action,
      id_puddle,
    } = req.body;
    const connection = await Connect();
    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    const result = await insertSubOrderTypeClearAll(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      remaining_volume,
      user_create_sub: getDataUser.idusers,
      date_action,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getListFishType = async (req: Request, res: Response) => {
  try {
    const connection = await Connect();
    const result = await getAllFishType(connection);
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const createFishType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const connection = await Connect();
    const result = await insertFishType(connection, { name });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteFishType = async (req: Request, res: Response) => {
  try {
    const idfish_type = req.params.idfish_type;
    const connection = await Connect();
    const result = await deleteFishTypeService(connection, {
      idfish_type: Number(idfish_type),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const changeWorkingStatusPuddle = async (
  req: Request,
  res: Response
) => {
  try {
    const { puddle_id, working_status } = req.body;
    const connection = await Connect();
    const result = await updateWorkingStatusPuddle(connection, {
      puddle_id: Number(puddle_id),
      working_status: Number(working_status),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateStatusTopSaltTask = async (req: Request, res: Response) => {
  try {
    const { topSalt, idpuddle } = req.body;
    const connection = await Connect();
    const result = await updateStatusTopSalt(connection, {
      topSalt: Number(topSalt),
      idpuddle: Number(idpuddle),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateDateStartFermantTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { start_date, idpuddle } = req.body;
    const connection = await Connect();
    const result = await updateDateStartFermant(connection, {
      start_date: start_date,
      idpuddle: Number(idpuddle),
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateChemOrderTask = async (req: Request, res: Response) => {
  try {
    const { chem, value, idorders } = req.body;

    const connection = await Connect();
    const result = await updateChemOrder(connection, {
      chem,
      value,
      idorders,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getLastedSubOrderById = async (req: Request, res: Response) => {
  try {
    const { puddle_id } = req.query;

    const connection = await Connect();
    const detailPuddle = await getDetailPuddleById(connection, {
      puddle_id: Number(puddle_id),
    });
    if (!!detailPuddle.message[0]?.lasted_order) {
      // lasted_order
      const response = await getLastedSubOrderByIdOrder(connection, {
        order_id: detailPuddle.message[0]?.lasted_order,
      });
      await DisConnect(connection);
      return res.status(200).send({
        ...response,
        idpuddle: detailPuddle.message[0]?.idpuddle,
        serial: detailPuddle.message[0]?.serial,
      });
    } else {
      await DisConnect(connection);
      res.status(409).send("INVALID_ORDER");
    }
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
};

export const exportFishSauceToNewPuddleForMixingTask = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      order_id,
      type_process = 12,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved = 0,
      volume,
      id_puddle,
      remaining_volume,
      action_puddle,
      target_puddle,
      serial_puddle,
      process,
      date_action,
      round,
    } = req.body;
    const connection = await Connect();

    const getDataUser: IUserPareToken = await getUserUUID(
      req.headers.authorization as string
    );

    const result = await transferSidhsauce(connection, {
      order_id,
      type_process,
      amount_items,
      amount_unit_per_price,
      amount_price,
      remaining_items,
      remaining_unit_per_price,
      remaining_price,
      approved,
      volume,
      user_create_sub: getDataUser.idusers,
      remaining_volume,
      action_puddle: target_puddle,
      action_serial_puddle: serial_puddle,
      process,
      date_action,
      round,
    });

    await insertTargetPuddle(connection, {
      id_puddle: target_puddle,
      id_sub_order: result.message.insertId,
      status: 0,
      source_puddle: id_puddle,
      source_serial_puddle: action_puddle,
      serial_puddle,
    });

    await updateTypePuddle(connection, {
      type_process: type_process,
      idpuddle: id_puddle,
      round,
    });

    await updateTimeActionPuddle(connection, {
      updateTime: date_action,
      idpuddle: id_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const changeVolumeForEdit = async (req: Request, res: Response) => {
  try {
    const { volume, idsub_orders } = req.body;
    const connection = await Connect();
    const result = await changeVolumeForEitService(connection, {
      volume: Number(volume),
      idsub_orders: Number(idsub_orders),
    });
    if (result.success === "success") {
      return res.status(200).send({ success: result.success });
    } else {
      return res
        .status(500)
        .send({ success: "error", message: result.message });
    }
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
