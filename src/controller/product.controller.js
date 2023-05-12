"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeProcessTask = exports.updateProcessDescritionSubOrderTask = exports.throwItemsInPuddleTask = exports.createTypeProcessTask = exports.getAllTypeProcessTask = exports.getSerialPuddleTask = exports.cancelGetInTask = exports.submitImportFishTask = exports.getTargetPendingTask = exports.addOnFishSauceWaterTask = exports.addOnSaltWaterTask = exports.exportSaltWaterToNewPuddleTask = exports.exportFishSauceToNewPuddleTask = exports.getAllOrdersFromPuddleTask = exports.updatePriceSubOrderTask = exports.getOrderDetailsTask = exports.createOrderTask = exports.getDetailPuddleByIdTask = exports.getAllPuddleTask = exports.updateDetailPuddleTask = exports.createPuddleTask = void 0;
const product_service_1 = require("../service/product.service");
const receive_service_1 = require("../service/receive.service");
const connect_1 = require("../utils/connect");
const getUUID_1 = __importDefault(require("../utils/getUUID"));
const logger_1 = __importDefault(require("../utils/logger"));
const type_utils_1 = require("../utils/type_utils");
const createPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id, serial } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.insertPuddle)(connection, { building_id, serial });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createPuddleTask = createPuddleTask;
const updateDetailPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id, status, uuid_puddle } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.updateDetailPuddle)(connection, {
            building_id,
            status,
            uuid_puddle,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateDetailPuddleTask = updateDetailPuddleTask;
const getAllPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.getAllPuddle)(connection, {
            building_id: parseInt(building_id),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getAllPuddleTask = getAllPuddleTask;
const getDetailPuddleByIdTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { puddle_id } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.getDetailPuddleById)(connection, {
            puddle_id: parseInt(puddle_id),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getDetailPuddleByIdTask = getDetailPuddleByIdTask;
const createOrderTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_name, uuid_puddle, puddle_id, fish, salt, laber, volume, description, status_puddle_order, fish_price, salt_price, laber_price, amount_items, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const getDataUser = yield (0, getUUID_1.default)(req.headers.authorization);
        const queryInsertOrder = yield (0, product_service_1.createOrder)(connection, {
            order_name,
            puddle_id,
            userId: getDataUser.idusers,
        });
        yield (0, product_service_1.updatePuddleOrderLasted)(connection, {
            orderId: queryInsertOrder,
            uuid_puddle,
            status: status_puddle_order,
            description,
        });
        const queryCreateSubOrder = yield (0, product_service_1.createSubOrder)(connection, {
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
            amount_unit_per_price: status_puddle_order === type_utils_1.TypeOrderPuddle.FERMENT
                ? (fish_price + salt_price + laber_price) / fish
                : 0,
            amount_price: fish_price + salt_price + laber_price,
            amount_items: status_puddle_order === type_utils_1.TypeOrderPuddle.FERMENT ? 100 : amount_items,
            remaining_volume: status_puddle_order === 1 ? volume : 0,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(queryCreateSubOrder);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createOrderTask = createOrderTask;
const getOrderDetailsTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.getOrderDetails)(connection, {
            order_id: parseInt(order_id),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getOrderDetailsTask = getOrderDetailsTask;
const updatePriceSubOrderTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fish_price, salt_price, laber_price, amount_items, idsub_orders, uuid_order, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        yield (0, product_service_1.updatePriceSubOrder)(connection, {
            fish_price,
            salt_price,
            laber_price,
            amount_unit_per_price: (fish_price + salt_price + laber_price) / amount_items,
            amount_price: fish_price + salt_price + laber_price,
            idsub_orders,
        });
        const result = yield (0, product_service_1.updateAmountPriceOrder)(connection, {
            amount: amount_items,
            unit_per_price: (fish_price + salt_price + laber_price) / amount_items,
            price: fish_price + salt_price + laber_price,
            uuid_order: uuid_order,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updatePriceSubOrderTask = updatePriceSubOrderTask;
const getAllOrdersFromPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_puddle } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.getAllOrderFromPuddle)(connection, {
            id_puddle: parseInt(id_puddle),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getAllOrdersFromPuddleTask = getAllOrdersFromPuddleTask;
/**
 * -type_process : 1 นำออก , 2 นำเข้า , 3 ถ่ายกาก
 */
const exportFishSauceToNewPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved = 0, volume, id_puddle, remaining_volume, action_puddle, target_puddle, serial_puddle, process, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const getDataUser = yield (0, getUUID_1.default)(req.headers.authorization);
        const result = yield (0, product_service_1.transferSidhsauce)(connection, {
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
        });
        yield (0, product_service_1.insertTargetPuddle)(connection, {
            id_puddle: target_puddle,
            id_sub_order: result.message.insertId,
            status: 0,
            source_puddle: id_puddle,
            source_serial_puddle: action_puddle,
            serial_puddle,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.exportFishSauceToNewPuddleTask = exportFishSauceToNewPuddleTask;
const exportSaltWaterToNewPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved = 0, volume, id_puddle, remaining_volume, action_puddle, target_puddle, serial_puddle, process, item_transfer, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const getDataUser = yield (0, getUUID_1.default)(req.headers.authorization);
        const result = yield (0, product_service_1.transferSidhsauce)(connection, {
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
        });
        yield (0, product_service_1.insertTargetPuddle)(connection, {
            id_puddle: target_puddle,
            id_sub_order: result.message.insertId,
            status: 0,
            source_puddle: id_puddle,
            source_serial_puddle: action_puddle,
            serial_puddle,
            item_transfer,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.exportSaltWaterToNewPuddleTask = exportSaltWaterToNewPuddleTask;
const addOnSaltWaterTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved, volume, remaining_volume, process, new_stock, idreceipt, id_puddle, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const getDataUser = yield (0, getUUID_1.default)(req.headers.authorization);
        yield (0, product_service_1.addOnVolumn)(connection, {
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
        });
        yield (0, receive_service_1.insertLogSaltStockReceive)(connection, {
            new_stock: new_stock,
            idreceipt: idreceipt,
            order_target: order_id,
            id_puddle: id_puddle,
        });
        const result = yield (0, receive_service_1.updateStockSaltService)(connection, {
            new_stock: new_stock,
            idreceipt: idreceipt,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e);
    }
});
exports.addOnSaltWaterTask = addOnSaltWaterTask;
const addOnFishSauceWaterTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved, volume, remaining_volume, new_stock, idreceipt, id_puddle, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const getDataUser = yield (0, getUUID_1.default)(req.headers.authorization);
        yield (0, product_service_1.addOnVolumn)(connection, {
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
        });
        yield (0, receive_service_1.insertLogFiashSauceStockReceive)(connection, {
            new_stock: new_stock,
            idreceipt: idreceipt,
            order_target: order_id,
            id_puddle: id_puddle,
        });
        const result = yield (0, receive_service_1.updateStockFiashSauceService)(connection, {
            new_stock: new_stock,
            idreceipt: idreceipt,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e);
    }
});
exports.addOnFishSauceWaterTask = addOnFishSauceWaterTask;
const getTargetPendingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_puddle } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.getTargetPending)(connection, {
            id_puddle: parseInt(id_puddle),
            status: 0,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getTargetPendingTask = getTargetPendingTask;
const submitImportFishTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { volume, order_id, type_process, amount_items, amount_price, remaining_items, remaining_price, idtarget_puddle, lasted_subId, remaining_volume, action_puddle, action_serial_puddle, process, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const getDataUser = yield (0, getUUID_1.default)(req.headers.authorization);
        yield (0, product_service_1.transferSidhsauce)(connection, {
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
        });
        yield (0, product_service_1.updateStatusTargetPuddle)(connection, {
            idtarget_puddle,
            status: 1,
        });
        const result = yield (0, product_service_1.updateStatusApprovedSubOrder)(connection, {
            idsub_orders: lasted_subId,
            approved: 1,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.submitImportFishTask = submitImportFishTask;
const cancelGetInTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_sub_order, idtarget_puddle } = req.body;
        const connection = yield (0, connect_1.Connect)();
        yield (0, product_service_1.deleteTargetPuddleById)(connection, {
            idtarget_puddle,
        });
        const result = yield (0, product_service_1.deleteSubOrderById)(connection, { id_sub_order });
        yield (0, connect_1.DisConnect)(connection);
        if (result.success === "success") {
            return res.status(200).send({ success: result.success });
        }
        else {
            return res
                .status(500)
                .send({ success: "error", message: result.message });
        }
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.cancelGetInTask = cancelGetInTask;
const getSerialPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idpuddle } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.getSerialPuddle)(connection, {
            idpuddle: parseInt(idpuddle),
        });
        yield (0, connect_1.DisConnect)(connection);
        if (result.success === "success") {
            return res
                .status(200)
                .send({ success: result.success, message: result.message });
        }
        else {
            return res
                .status(500)
                .send({ success: "error", message: result.message });
        }
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getSerialPuddleTask = getSerialPuddleTask;
const getAllTypeProcessTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.getAllTypeProcess)(connection);
        yield (0, connect_1.DisConnect)(connection);
        return res
            .status(200)
            .send({ success: result.success, message: result.message });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getAllTypeProcessTask = getAllTypeProcessTask;
const createTypeProcessTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { process_name } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.createTypeProcess)(connection, {
            process_name,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send({ success: result.success });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createTypeProcessTask = createTypeProcessTask;
const throwItemsInPuddleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { process_name } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.createTypeProcess)(connection, {
            process_name,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send({ success: result.success });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.throwItemsInPuddleTask = throwItemsInPuddleTask;
const updateProcessDescritionSubOrderTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { process, subOrderId } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, product_service_1.updateTypeProcessSubOrder)(connection, {
            process,
            subOrderId,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send({ success: result.success });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateProcessDescritionSubOrderTask = updateProcessDescritionSubOrderTask;
const closeProcessTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved, volume, remaining_volume, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const getDataUser = yield (0, getUUID_1.default)(req.headers.authorization);
        const result = yield (0, product_service_1.insertSubOrderTypeClearAll)(connection, {
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
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.closeProcessTask = closeProcessTask;
