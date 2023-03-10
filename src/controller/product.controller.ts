import { Request, Response } from "express";
import { number } from "zod";
import {
  createOrder,
  createSubOrder,
  deleteSubOrderById,
  deleteTargetPuddleById,
  getAllOrderFromPuddle,
  getAllPuddle,
  getAllTypeProcess,
  getDetailPuddleById,
  getOrderDetails,
  getSerialPuddle,
  getTargetPending,
  insertPuddle,
  insertTargetPuddle,
  transferSidhsauce,
  updateAmountPriceOrder,
  updateDetailPuddle,
  updatePriceSubOrder,
  updatePuddleOrderLasted,
  updateStatusApprovedSubOrder,
  updateStatusTargetPuddle,
} from "../service/product.service";
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
 * -type_process : 1 ??????????????? , 2 ?????????????????? , 3 ?????????????????????
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
    });

    await insertTargetPuddle(connection, {
      id_puddle: target_puddle,
      id_sub_order: result.message.insertId,
      status: 0,
      source_puddle: id_puddle,
      source_serial_puddle: action_puddle,
      serial_puddle,
    });
    await DisConnect(connection);
    return res.status(200).send(result);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
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
    });

    await updateStatusTargetPuddle(connection, {
      idtarget_puddle,
      status: 1,
    });

    const result = await updateStatusApprovedSubOrder(connection, {
      idsub_orders: lasted_subId,
      approved: 1,
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
