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
exports.deleteFishTypeService = exports.insertFishType = exports.getAllFishType = exports.updateTypeProcessSubOrder = exports.createTypeProcess = exports.getAllTypeProcess = exports.getSerialPuddle = exports.deleteSubOrderById = exports.deleteTargetPuddleById = exports.updateStatusApprovedSubOrder = exports.updateStatusTargetPuddle = exports.submitImportFish = exports.getTargetPending = exports.getAllOrderFromPuddle = exports.insertTargetPuddle = exports.transferSidhsauce = exports.addOnVolumn = exports.insertSubOrderTypeClearAll = exports.updateAmountPriceOrder = exports.updatePriceSubOrder = exports.getOrderDetails = exports.createSubOrder = exports.updatePuddleOrderLasted = exports.createOrder = exports.getDetailPuddleById = exports.getAllPuddle = exports.updateDetailPuddle = exports.insertPuddle = void 0;
const config_1 = __importDefault(require("config"));
const connect_1 = require("../utils/connect");
const dotenv_1 = __importDefault(require("dotenv"));
const response_1 = __importDefault(require("../utils/response"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const DB = config_1.default.get("database");
const insertPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id, serial } = input;
        const sql = `INSERT INTO ${DB}.puddle (uuid_puddle, building_id, serial) values (UUID(), ${building_id}, '${serial}') ; `;
        const result = yield (0, connect_1.Query)(connection, sql);
        if (result.insertId) {
            return (0, response_1.default)(true, "CREATE_SUCCESS");
        }
        else {
            return (0, response_1.default)(false, "APP_CRASH");
        }
    }
    catch (e) {
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.insertPuddle = insertPuddle;
const updateDetailPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id, status, uuid_puddle } = input;
        const sql = `UPDATE ${DB}.puddle SET building_id=${building_id},
       status=${status} WHERE uuid_puddle='${uuid_puddle}' ; `;
        yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, "UPDATE_SUCCESS");
    }
    catch (e) {
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.updateDetailPuddle = updateDetailPuddle;
const getAllPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id } = input;
        const sql = `SELECT * FROM ${DB}.puddle where building_id=${building_id}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.getAllPuddle = getAllPuddle;
const getDetailPuddleById = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { puddle_id } = input;
        const sql = `SELECT * FROM ${DB}.puddle where idpuddle=${puddle_id}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.getDetailPuddleById = getDetailPuddleById;
const createOrder = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_name, puddle_id, userId } = input;
        const sql = `INSERT INTO ${DB}.orders (uuid_order, order_name, user_create, puddle_owner) values (UUID(), '${order_name}', ${userId} ,${puddle_id}); `;
        const queryInsertOrder = yield (0, connect_1.Query)(connection, sql);
        return queryInsertOrder.insertId;
    }
    catch (e) {
        return (0, response_1.default)(false, e);
    }
});
exports.createOrder = createOrder;
const updatePuddleOrderLasted = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uuid_puddle, orderId, status, description } = input;
        const sql = `UPDATE ${DB}.puddle SET lasted_order=${orderId}, status=${status}, description='${description}' WHERE uuid_puddle='${uuid_puddle}' ; `;
        const queryUpdatePuddleOrderLasted = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, queryUpdatePuddleOrderLasted);
    }
    catch (e) {
        return (0, response_1.default)(false, e);
    }
});
exports.updatePuddleOrderLasted = updatePuddleOrderLasted;
const createSubOrder = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, fish, salt, laber, description, userId, volume, fish_price, salt_price, laber_price, amount_unit_per_price, amount_price, amount_items, remaining_volume, } = input;
        const sql = `INSERT INTO ${DB}.sub_orders (idOrders, fish, salt, laber, description, user_create_sub, amount_items, volume,
      fish_price,salt_price, laber_price,amount_unit_per_price,amount_price,remaining_items,remaining_volume) values (${orderId}, ${fish},${salt},${laber},'${description}',${userId}, ${amount_items}, ${volume}, ${fish_price}, ${salt_price},${laber_price},${amount_unit_per_price},${amount_price}, ${amount_items}, ${remaining_volume});`;
        const queryCreateSubOrder = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, queryCreateSubOrder);
    }
    catch (e) {
        return (0, response_1.default)(false, e);
    }
});
exports.createSubOrder = createSubOrder;
const getOrderDetails = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = input;
        const sql = `SELECT * FROM ${DB}.orders
      inner join (SELECT * FROM ${DB}.sub_orders) sub_order on  orders.idorders = sub_order.idOrders
      left join (SELECT idtype_process,process_name FROM ${DB}.type_process) process_type on sub_order.type_process = process_type.idtype_process
      where orders.idorders = ${order_id};
      `;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        return (0, response_1.default)(false, []);
    }
});
exports.getOrderDetails = getOrderDetails;
const updatePriceSubOrder = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fish_price, salt_price, laber_price, amount_unit_per_price, amount_price, idsub_orders, } = input;
        const sql = `UPDATE ${DB}.sub_orders 
        set fish_price=${fish_price}, salt_price=${salt_price}, laber_price=${laber_price}, amount_unit_per_price=${amount_unit_per_price}, amount_price=${amount_price}
        where idsub_orders = ${idsub_orders};
        `;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.updatePriceSubOrder = updatePriceSubOrder;
const updateAmountPriceOrder = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, unit_per_price, price, uuid_order } = input;
        const sql = `UPDATE ${DB}.orders 
          set amount=${amount}, unit_per_price=${unit_per_price}, price=${price}
          where uuid_order = '${uuid_order}';
          `;
        yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, "UPDATE_SUCCESS");
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.updateAmountPriceOrder = updateAmountPriceOrder;
const insertSubOrderTypeClearAll = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved, volume, remaining_volume, user_create_sub, } = input;
        const listField = `idOrders, type, amount_items, amount_unit_per_price, 
      amount_price, remaining_items, remaining_unit_per_price, remaining_price, 
      approved, volume, user_create_sub, remaining_volume`;
        const fieldValue = `${order_id}, ${type_process}, ${amount_items}, ${amount_unit_per_price}, 
      ${amount_price}, ${remaining_items}, ${remaining_unit_per_price}, ${remaining_price}, 
      ${approved}, ${volume}, ${user_create_sub}, ${remaining_volume}`;
        const sql = `INSERT INTO ${DB}.sub_orders (${listField}) values (${fieldValue});`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error("bad insert");
    }
});
exports.insertSubOrderTypeClearAll = insertSubOrderTypeClearAll;
const addOnVolumn = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved, volume, user_create_sub, remaining_volume, process, } = input;
        const listField = `idOrders, type, amount_items, amount_unit_per_price, 
      amount_price, remaining_items, remaining_unit_per_price, remaining_price, 
      approved, volume, user_create_sub, remaining_volume,  type_process`;
        const fieldValue = `${order_id}, ${type_process}, ${amount_items}, ${amount_unit_per_price}, 
      ${amount_price}, ${remaining_items}, ${remaining_unit_per_price}, ${remaining_price}, 
      ${approved}, ${volume}, ${user_create_sub}, ${remaining_volume},${process ? process : null}`;
        const sql = `INSERT INTO ${DB}.sub_orders (${listField}) values (${fieldValue});`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad request: ${e}`);
    }
});
exports.addOnVolumn = addOnVolumn;
const transferSidhsauce = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, type_process, amount_items, amount_unit_per_price, amount_price, remaining_items, remaining_unit_per_price, remaining_price, approved, volume, user_create_sub, remaining_volume, action_puddle, action_serial_puddle, process, } = input;
        const listField = process
            ? `idOrders, type, amount_items, amount_unit_per_price, 
      amount_price, remaining_items, remaining_unit_per_price, remaining_price, 
      approved, volume, user_create_sub, remaining_volume, action_puddle, action_serial_puddle, type_process`
            : `idOrders, type, amount_items, amount_unit_per_price, 
      amount_price, remaining_items, remaining_unit_per_price, remaining_price, 
      approved, volume, user_create_sub, remaining_volume, action_puddle, action_serial_puddle`;
        const fieldValue = process
            ? `${order_id}, ${type_process}, ${amount_items}, ${amount_unit_per_price}, 
      ${amount_price}, ${remaining_items}, ${remaining_unit_per_price}, ${remaining_price}, 
      ${approved}, ${volume}, ${user_create_sub}, ${remaining_volume}, ${action_puddle}, ${action_serial_puddle}, ${process}`
            : `${order_id}, ${type_process}, ${amount_items}, ${amount_unit_per_price}, 
      ${amount_price}, ${remaining_items}, ${remaining_unit_per_price}, ${remaining_price}, 
      ${approved}, ${volume}, ${user_create_sub}, ${remaining_volume}, ${action_puddle}, ${action_serial_puddle}`;
        const sql = `INSERT INTO ${DB}.sub_orders (${listField}) values (${fieldValue});`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.transferSidhsauce = transferSidhsauce;
const insertTargetPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_puddle, id_sub_order, status = 0, source_puddle, source_serial_puddle, serial_puddle, item_transfer, } = input;
        const sql = `INSERT INTO ${DB}.target_puddle (id_puddle, id_sub_order, status, source_puddle, source_serial_puddle, serial_puddle, item_transfer) values (${id_puddle}, ${id_sub_order}, ${status}, ${source_puddle},${source_serial_puddle}, ${serial_puddle} ,${item_transfer ? item_transfer : 0});`;
        yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, "INSERT_SUCCESS");
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.insertTargetPuddle = insertTargetPuddle;
const getAllOrderFromPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_puddle } = input;
        const sql = ` SELECT * FROM ${DB}.orders where puddle_owner=${id_puddle} order by idorders desc ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.getAllOrderFromPuddle = getAllOrderFromPuddle;
const getTargetPending = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_puddle, status } = input;
        const sql = `SELECT * FROM ${DB}.target_puddle
    inner join (SELECT * FROM jaw_production_process.sub_orders) sub_orders ON target_puddle.id_sub_order = sub_orders.idsub_orders
    where id_puddle = ${id_puddle} and status = ${status}
    ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.getTargetPending = getTargetPending;
const submitImportFish = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_puddle, status } = input;
        const sql = `SELECT * FROM ${DB}.target_puddle
      inner join (SELECT * FROM jaw_production_process.sub_orders) sub_orders ON target_puddle.id_sub_order = sub_orders.idsub_orders
      where id_puddle = ${id_puddle} and status = ${status}
      ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.submitImportFish = submitImportFish;
const updateStatusTargetPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idtarget_puddle, status } = input;
        const sql = `UPDATE ${DB}.target_puddle set status=${status} where idtarget_puddle = ${idtarget_puddle};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.updateStatusTargetPuddle = updateStatusTargetPuddle;
const updateStatusApprovedSubOrder = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idsub_orders, approved } = input;
        const sql = `UPDATE ${DB}.sub_orders set approved=${approved} where idsub_orders=${idsub_orders};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.updateStatusApprovedSubOrder = updateStatusApprovedSubOrder;
const deleteTargetPuddleById = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idtarget_puddle } = input;
        const sql = `DELETE FROM  ${DB}.target_puddle where idtarget_puddle=${idtarget_puddle};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.deleteTargetPuddleById = deleteTargetPuddleById;
const deleteSubOrderById = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_sub_order } = input;
        const sql = `DELETE FROM  ${DB}.sub_orders where idsub_orders=${id_sub_order};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.deleteSubOrderById = deleteSubOrderById;
const getSerialPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idpuddle } = input;
        const sql = `SELECT serial FROM ${DB}.puddle where idpuddle=${idpuddle};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        console.log(e);
        return (0, response_1.default)(false, "APP_CRASH");
    }
});
exports.getSerialPuddle = getSerialPuddle;
const getAllTypeProcess = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT * FROM  ${DB}.type_process;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error("bad request");
    }
});
exports.getAllTypeProcess = getAllTypeProcess;
const createTypeProcess = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { process_name } = input;
        const sql = `INSERT INTO ${DB}.type_process (process_name) values ('${process_name}');`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createTypeProcess = createTypeProcess;
const updateTypeProcessSubOrder = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { process, subOrderId } = input;
        const sql = `UPDATE  ${DB}.sub_orders SET type_process = ${process} where idsub_orders = ${subOrderId} ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error("bad request");
    }
});
exports.updateTypeProcessSubOrder = updateTypeProcessSubOrder;
const getAllFishType = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT * FROM  ${DB}.fish_type;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        logger_1.default.error(e);
        throw new Error("bad request");
    }
});
exports.getAllFishType = getAllFishType;
const insertFishType = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = input;
        const sql = `INSERT INTO  ${DB}.fish_type (name) VALUES ('${name}');`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        logger_1.default.error(e);
        throw new Error("bad request");
    }
});
exports.insertFishType = insertFishType;
const deleteFishTypeService = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idfish_type } = input;
        const sql = `DELETE FROM ${DB}.fish_type where idfish_type=${idfish_type};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        logger_1.default.error(e);
        throw new Error("bad request");
    }
});
exports.deleteFishTypeService = deleteFishTypeService;
