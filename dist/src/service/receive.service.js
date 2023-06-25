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
exports.deleteCustomerBil = exports.insertCustomer = exports.getAllRowCustomerByBill = exports.getCustomerByBillPagination = exports.getCustomerByBill = exports.updateStockSolidSaltService = exports.getReceiveSolidSaltByOrderId = exports.insertLogSolidSaltStockReceive = exports.fillterReceiveSolidSalt = exports.getAllRowSolidSaltListReceiveWithOutEmpty = exports.getAllRowSolidSaltListReceive = exports.getSolidSaltListReceivePaginationWithOutEmpty = exports.getSolidSaltListReceivePagination = exports.insertRecieveSolidSaltBill = exports.getReceiveFiashSauceByOrderId = exports.updateStockFiashSauceService = exports.insertLogFiashSauceStockReceive = exports.fillterReceiveFiashSauce = exports.getAllRowFiashSauceListReceiveWithOutEmpty = exports.getAllRowFiashSauceListReceive = exports.getFiashSauceListReceivePaginationWithOutEmpty = exports.getFiashSauceListReceivePagination = exports.insertRecieveFiashSauceBill = exports.getReceiveSaltByOrderId = exports.updateStockSaltService = exports.insertLogSaltStockReceive = exports.fillterReceiveSalt = exports.getAllRowSaltListReceiveWithOutEmpty = exports.getAllRowSaltListReceive = exports.getSaltListReceivePaginationWithOutEmpty = exports.getSaltListReceivePagination = exports.insertRecieveSaltBill = exports.getReceiveWeightFishByOrderId = exports.getAllRowListReceiveWithoutEmpty = exports.getAllRowListReceive = exports.getListReceivePaginationWithoutEmpty = exports.getListReceivePagination = exports.insertLogStockReceive = exports.updateStockService = exports.updateOrderConnect = exports.fillterReceiveWeightFish = exports.getReceiveWeightFishById = exports.getAllReceiveFishWeight = exports.insertRecieveFishWeightBill = void 0;
const config_1 = __importDefault(require("config"));
const connect_1 = require("../utils/connect");
const dotenv_1 = __importDefault(require("dotenv"));
const response_1 = __importDefault(require("../utils/response"));
dotenv_1.default.config();
const DB = config_1.default.get("database");
const insertRecieveFishWeightBill = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, price_per_weigh, amount_price, vehicle_register, customer_name, product_name, store_name, description, date_action, } = input;
        const sql = `INSERT INTO ${DB}.receipt 
    ( no,
      weigh_net,
      price_per_weigh,
      amount_price,
      vehicle_register,
      customer_name,
      product_name,
      store_name,
      description,
      stock, date_action ) 
    values ('${no}',  ${weigh_net},${price_per_weigh}, ${amount_price}, 
   '${vehicle_register}', '${customer_name}', '${product_name}', '${store_name}', '${description}', ${weigh_net}, '${date_action}' );`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.insertRecieveFishWeightBill = insertRecieveFishWeightBill;
const getAllReceiveFishWeight = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT * FROM ${DB}.receipt;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllReceiveFishWeight = getAllReceiveFishWeight;
const getReceiveWeightFishById = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idreceipt } = input;
        const sql = `SELECT * FROM ${DB}.receipt where idreceipt = ${idreceipt};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getReceiveWeightFishById = getReceiveWeightFishById;
const fillterReceiveWeightFish = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, vehicle_register, customer_name, product_name, store_name, stock, } = input;
        const sql = `SELECT * FROM ${DB}.receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or vehicle_register LIKE '%${vehicle_register}%' or customer_name LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or store_name LIKE '%${store_name}%' or stock LIKE '%${stock}%' ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.fillterReceiveWeightFish = fillterReceiveWeightFish;
const updateOrderConnect = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_connect, idreceipt } = input;
        const sql = `UPDATE ${DB}.receipt SET order_connect = ${order_connect} WHERE idreceipt = ${idreceipt};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.updateOrderConnect = updateOrderConnect;
const updateStockService = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt } = input;
        const sql = `UPDATE ${DB}.receipt SET stock = stock-${new_stock} WHERE idreceipt = ${idreceipt};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.updateStockService = updateStockService;
const insertLogStockReceive = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt, order_target, id_puddle } = input;
        const sql = `INSERT INTO ${DB}.log_fishweight (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.insertLogStockReceive = insertLogStockReceive;
const getListReceivePagination = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.receipt limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getListReceivePagination = getListReceivePagination;
const getListReceivePaginationWithoutEmpty = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.receipt where stock != 0 limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getListReceivePaginationWithoutEmpty = getListReceivePaginationWithoutEmpty;
const getAllRowListReceive = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.receipt;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowListReceive = getAllRowListReceive;
const getAllRowListReceiveWithoutEmpty = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.receipt where stock != 0;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowListReceiveWithoutEmpty = getAllRowListReceiveWithoutEmpty;
const getReceiveWeightFishByOrderId = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = input;
        const sql = `SELECT * FROM  ${DB}.log_fishweight 
    inner join (SELECT idreceipt, no, weigh_net, price_per_weigh, amount_price, customer_name, product_name, store_name, stock FROM  ${DB}.receipt) receipe_table on receipe_table.idreceipt = log_fishweight.receipt_target 
    where order_target = ${order_id};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getReceiveWeightFishByOrderId = getReceiveWeightFishByOrderId;
// ---------------------------------- salt receipt ----------------------------------
const insertRecieveSaltBill = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, product_name, weigh_net, price_per_weigh, price_net, customer, date_action, } = input;
        const sql = `INSERT INTO ${DB}.salt_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net}, '${date_action}' );`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.insertRecieveSaltBill = insertRecieveSaltBill;
const getSaltListReceivePagination = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.salt_receipt limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getSaltListReceivePagination = getSaltListReceivePagination;
// where stock != 0;
const getSaltListReceivePaginationWithOutEmpty = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.salt_receipt where stock != 0 limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getSaltListReceivePaginationWithOutEmpty = getSaltListReceivePaginationWithOutEmpty;
const getAllRowSaltListReceive = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.salt_receipt;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowSaltListReceive = getAllRowSaltListReceive;
const getAllRowSaltListReceiveWithOutEmpty = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.salt_receipt  where stock != 0;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowSaltListReceiveWithOutEmpty = getAllRowSaltListReceiveWithOutEmpty;
const fillterReceiveSalt = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, customer_name, product_name, stock } = input;
        const sql = `SELECT * FROM ${DB}.salt_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.fillterReceiveSalt = fillterReceiveSalt;
const insertLogSaltStockReceive = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt, order_target, id_puddle } = input;
        const sql = `INSERT INTO ${DB}.log_salt_receipt (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.insertLogSaltStockReceive = insertLogSaltStockReceive;
const updateStockSaltService = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt } = input;
        const sql = `UPDATE ${DB}.salt_receipt SET stock = stock-${new_stock} WHERE idsalt_receipt = ${idreceipt};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.updateStockSaltService = updateStockSaltService;
const getReceiveSaltByOrderId = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = input;
        const sql = `SELECT * FROM  ${DB}.log_salt_receipt 
    inner join (SELECT idsalt_receipt, no, product_name,weigh_net, stock FROM  ${DB}.salt_receipt) receipe_table on receipe_table.idsalt_receipt = log_salt_receipt.receipt_target 
    where order_target = ${order_id};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getReceiveSaltByOrderId = getReceiveSaltByOrderId;
// ---------------------------------- Fish Sauce receipt ----------------------------------
const insertRecieveFiashSauceBill = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, product_name, weigh_net, price_per_weigh, price_net, customer, date_action, } = input;
        const sql = `INSERT INTO ${DB}.fishsauce_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net}, '${date_action}' );`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.insertRecieveFiashSauceBill = insertRecieveFiashSauceBill;
const getFiashSauceListReceivePagination = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.fishsauce_receipt limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getFiashSauceListReceivePagination = getFiashSauceListReceivePagination;
const getFiashSauceListReceivePaginationWithOutEmpty = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.fishsauce_receipt where stock != 0 limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getFiashSauceListReceivePaginationWithOutEmpty = getFiashSauceListReceivePaginationWithOutEmpty;
// where stock != 0
const getAllRowFiashSauceListReceive = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.fishsauce_receipt;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowFiashSauceListReceive = getAllRowFiashSauceListReceive;
const getAllRowFiashSauceListReceiveWithOutEmpty = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.fishsauce_receipt  where stock != 0;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowFiashSauceListReceiveWithOutEmpty = getAllRowFiashSauceListReceiveWithOutEmpty;
const fillterReceiveFiashSauce = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, customer_name, product_name, stock } = input;
        const sql = `SELECT * FROM ${DB}.fishsauce_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.fillterReceiveFiashSauce = fillterReceiveFiashSauce;
const insertLogFiashSauceStockReceive = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt, order_target, id_puddle } = input;
        const sql = `INSERT INTO ${DB}.log_fishsauce (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.insertLogFiashSauceStockReceive = insertLogFiashSauceStockReceive;
const updateStockFiashSauceService = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt } = input;
        const sql = `UPDATE ${DB}.fishsauce_receipt SET stock = stock-${new_stock} WHERE idfishsauce_receipt = ${idreceipt};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.updateStockFiashSauceService = updateStockFiashSauceService;
const getReceiveFiashSauceByOrderId = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = input;
        const sql = `SELECT * FROM  ${DB}.log_fishsauce 
    inner join (SELECT idfishsauce_receipt, no, product_name,weigh_net, stock FROM  ${DB}.fishsauce_receipt) receipe_table on receipe_table.idfishsauce_receipt = log_fishsauce.receipt_target 
    where order_target = ${order_id};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getReceiveFiashSauceByOrderId = getReceiveFiashSauceByOrderId;
// ---------------------------------- solid salt receipt ----------------------------------
const insertRecieveSolidSaltBill = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, product_name, weigh_net, price_per_weigh, price_net, customer, date_action, } = input;
        const sql = `INSERT INTO ${DB}.solid_salt_receipt 
    ( no, product_name, weigh_net, price_per_weigh, price_net, customer, stock, date_action ) 
    values ('${no}',  '${product_name}', ${weigh_net},${price_per_weigh}, ${price_net}, 
    '${customer}',  ${weigh_net} , '${date_action}');`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.insertRecieveSolidSaltBill = insertRecieveSolidSaltBill;
const getSolidSaltListReceivePagination = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.solid_salt_receipt limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getSolidSaltListReceivePagination = getSolidSaltListReceivePagination;
const getSolidSaltListReceivePaginationWithOutEmpty = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = input;
        const sql = `SELECT * FROM ${DB}.solid_salt_receipt where stock != 0 limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getSolidSaltListReceivePaginationWithOutEmpty = getSolidSaltListReceivePaginationWithOutEmpty;
const getAllRowSolidSaltListReceive = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.solid_salt_receipt;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowSolidSaltListReceive = getAllRowSolidSaltListReceive;
const getAllRowSolidSaltListReceiveWithOutEmpty = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.solid_salt_receipt  where stock != 0;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowSolidSaltListReceiveWithOutEmpty = getAllRowSolidSaltListReceiveWithOutEmpty;
const fillterReceiveSolidSalt = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, customer_name, product_name, stock } = input;
        const sql = `SELECT * FROM ${DB}.solid_salt_receipt where no LIKE '%${no}%' or weigh_net LIKE '%${weigh_net}%'
    or customer LIKE '%${customer_name}%' 
    or product_name LIKE '%${product_name}%' or stock LIKE '%${stock}%' ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.fillterReceiveSolidSalt = fillterReceiveSolidSalt;
const insertLogSolidSaltStockReceive = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt, order_target, id_puddle } = input;
        const sql = `INSERT INTO ${DB}.log_solid_salt_receipt (amount, receipt_target, order_target, puddle) values (${new_stock}, ${idreceipt}, ${order_target}, ${id_puddle});`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.insertLogSolidSaltStockReceive = insertLogSolidSaltStockReceive;
const getReceiveSolidSaltByOrderId = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = input;
        const sql = `SELECT * FROM  ${DB}.log_solid_salt_receipt 
    inner join (SELECT idsolid_salt_receipt, no, product_name,weigh_net, stock FROM  ${DB}.solid_salt_receipt) receipe_table on receipe_table.idsolid_salt_receipt = log_solid_salt_receipt.receipt_target 
    where order_target = ${order_id};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getReceiveSolidSaltByOrderId = getReceiveSolidSaltByOrderId;
const updateStockSolidSaltService = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt } = input;
        const sql = `UPDATE ${DB}.solid_salt_receipt SET stock = stock-${new_stock} WHERE idsolid_salt_receipt = ${idreceipt};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.updateStockSolidSaltService = updateStockSolidSaltService;
// query customer
const getCustomerByBill = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type_bill } = input;
        const sql = `SELECT * FROM ${DB}.customer_bill where type_bill=${type_bill};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getCustomerByBill = getCustomerByBill;
const getCustomerByBillPagination = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type_bill, page, offset } = input;
        const sql = `SELECT * FROM ${DB}.customer_bill where type_bill=${type_bill} limit ${page * offset}, ${offset}`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getCustomerByBillPagination = getCustomerByBillPagination;
const getAllRowCustomerByBill = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type_bill } = input;
        const sql = `SELECT  COUNT(*) as allRows FROM ${DB}.customer_bill where type_bill=${type_bill} ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return result;
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.getAllRowCustomerByBill = getAllRowCustomerByBill;
const insertCustomer = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type_bill, name } = input;
        const sql = `INSERT INTO ${DB}.customer_bill (type_bill, name) VALUES (${type_bill}, '${name}');`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad query : ${e}`);
    }
});
exports.insertCustomer = insertCustomer;
const deleteCustomerBil = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idcustomer_bill } = input;
        const sql = `DELETE FROM ${DB}.customer_bill where idcustomer_bill=${idcustomer_bill};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error("bad request");
    }
});
exports.deleteCustomerBil = deleteCustomerBil;
