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
exports.deleteCustomer = exports.createCustomer = exports.getCustomerByBillTaskPaginationTask = exports.getCustomerByBillTask = exports.getLogReceiveFiashSauceByOrdersIdTask = exports.fillterReceiveFiashSauceTask = exports.getReceiveFiashSauceBillPaginationWithOutEmptyTask = exports.getReceiveFiashSauceBillPaginationTask = exports.createFiashSauceBillTask = exports.getLogReceiveSaltByOrdersIdTask = exports.fillterReceiveSaltTask = exports.getReceiveSaltBillPaginationWithOutEmptyTask = exports.getReceiveSaltBillPaginationTask = exports.createSaltBillTask = exports.updateStockSolidSaltTask = exports.getLogReceiveSolidSaltByOrdersIdTask = exports.fillterReceiveSolidSaltTask = exports.getReceiveSolidSaltBillPaginationWithOutEmptyTask = exports.getReceiveSolidSaltBillPaginationTask = exports.createSolidSaltBillTask = exports.updateStockTask = exports.getReceiveFishWeightPaginationWithOutEmptyTask = exports.getReceiveFishWeightPaginationTask = exports.updateOrderConnectTask = exports.fillterReceiveWeightFishTask = exports.getReceiveWeightFishByOrdersIdTask = exports.getReceiveWeightFishByIdTask = exports.getListReceiveWeightFishTask = exports.createFishWeightBillTask = void 0;
const receive_service_1 = require("../service/receive.service");
const connect_1 = require("../utils/connect");
const logger_1 = __importDefault(require("../utils/logger"));
const createFishWeightBillTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, price_per_weigh, amount_price, vehicle_register, customer_name, product_name, store_name, description, date_action, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.insertRecieveFishWeightBill)(connection, {
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
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createFishWeightBillTask = createFishWeightBillTask;
const getListReceiveWeightFishTask = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.getAllReceiveFishWeight)(connection);
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getListReceiveWeightFishTask = getListReceiveWeightFishTask;
const getReceiveWeightFishByIdTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idreceipt } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.getReceiveWeightFishById)(connection, {
            idreceipt: parseInt(idreceipt),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveWeightFishByIdTask = getReceiveWeightFishByIdTask;
const getReceiveWeightFishByOrdersIdTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.getReceiveWeightFishByOrderId)(connection, {
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
exports.getReceiveWeightFishByOrdersIdTask = getReceiveWeightFishByOrdersIdTask;
const fillterReceiveWeightFishTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, vehicle_register, customer_name, product_name, store_name, stock, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.fillterReceiveWeightFish)(connection, {
            no,
            weigh_net,
            vehicle_register,
            customer_name,
            product_name,
            store_name,
            stock,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.fillterReceiveWeightFishTask = fillterReceiveWeightFishTask;
const updateOrderConnectTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_connect, idreceipt } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.updateOrderConnect)(connection, {
            order_connect,
            idreceipt,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateOrderConnectTask = updateOrderConnectTask;
const getReceiveFishWeightPaginationTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getListReceivePagination)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowListReceive)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveFishWeightPaginationTask = getReceiveFishWeightPaginationTask;
const getReceiveFishWeightPaginationWithOutEmptyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getListReceivePaginationWithoutEmpty)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowListReceiveWithoutEmpty)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveFishWeightPaginationWithOutEmptyTask = getReceiveFishWeightPaginationWithOutEmptyTask;
const updateStockTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt, order_target, id_puddle } = req.body;
        const connection = yield (0, connect_1.Connect)();
        yield (0, receive_service_1.updateStockService)(connection, {
            new_stock,
            idreceipt,
        });
        const response = yield (0, receive_service_1.insertLogStockReceive)(connection, {
            new_stock,
            idreceipt,
            order_target,
            id_puddle,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(response);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateStockTask = updateStockTask;
// ------------------------ solid salt receipt ------------------------
const createSolidSaltBillTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, product_name, weigh_net, price_per_weigh, price_net, customer, date_action, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.insertRecieveSolidSaltBill)(connection, {
            no,
            product_name,
            weigh_net,
            price_per_weigh,
            price_net,
            customer,
            date_action,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createSolidSaltBillTask = createSolidSaltBillTask;
const getReceiveSolidSaltBillPaginationTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getSolidSaltListReceivePagination)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowSolidSaltListReceive)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveSolidSaltBillPaginationTask = getReceiveSolidSaltBillPaginationTask;
const getReceiveSolidSaltBillPaginationWithOutEmptyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getSolidSaltListReceivePaginationWithOutEmpty)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowSolidSaltListReceiveWithOutEmpty)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveSolidSaltBillPaginationWithOutEmptyTask = getReceiveSolidSaltBillPaginationWithOutEmptyTask;
const fillterReceiveSolidSaltTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, customer_name, product_name, stock } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.fillterReceiveSolidSalt)(connection, {
            no,
            weigh_net,
            customer_name,
            product_name,
            stock,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.fillterReceiveSolidSaltTask = fillterReceiveSolidSaltTask;
const getLogReceiveSolidSaltByOrdersIdTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        if (order_id.toString() === "null") {
            return res.status(200).send([]);
        }
        else {
            const connection = yield (0, connect_1.Connect)();
            const result = yield (0, receive_service_1.getReceiveSaltByOrderId)(connection, {
                order_id: parseInt(order_id),
            });
            yield (0, connect_1.DisConnect)(connection);
            return res.status(200).send(result);
        }
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getLogReceiveSolidSaltByOrdersIdTask = getLogReceiveSolidSaltByOrdersIdTask;
const updateStockSolidSaltTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_stock, idreceipt, order_target, id_puddle } = req.body;
        const connection = yield (0, connect_1.Connect)();
        yield (0, receive_service_1.updateStockSolidSaltService)(connection, {
            new_stock,
            idreceipt,
        });
        const response = yield (0, receive_service_1.insertLogSolidSaltStockReceive)(connection, {
            new_stock,
            idreceipt,
            order_target,
            id_puddle,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(response);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateStockSolidSaltTask = updateStockSolidSaltTask;
// ------------------------ salt receipt ------------------------
const createSaltBillTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, product_name, weigh_net, price_per_weigh, price_net, customer, date_action, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.insertRecieveSaltBill)(connection, {
            no,
            product_name,
            weigh_net,
            price_per_weigh,
            price_net,
            customer,
            date_action,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createSaltBillTask = createSaltBillTask;
const getReceiveSaltBillPaginationTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getSaltListReceivePagination)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowSaltListReceive)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveSaltBillPaginationTask = getReceiveSaltBillPaginationTask;
const getReceiveSaltBillPaginationWithOutEmptyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getSaltListReceivePaginationWithOutEmpty)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowSaltListReceiveWithOutEmpty)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveSaltBillPaginationWithOutEmptyTask = getReceiveSaltBillPaginationWithOutEmptyTask;
const fillterReceiveSaltTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, customer_name, product_name, stock } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.fillterReceiveSalt)(connection, {
            no,
            weigh_net,
            customer_name,
            product_name,
            stock,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.fillterReceiveSaltTask = fillterReceiveSaltTask;
const getLogReceiveSaltByOrdersIdTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        if (order_id.toString() === "null") {
            return res.status(200).send([]);
        }
        else {
            const connection = yield (0, connect_1.Connect)();
            const result = yield (0, receive_service_1.getReceiveSaltByOrderId)(connection, {
                order_id: parseInt(order_id),
            });
            yield (0, connect_1.DisConnect)(connection);
            return res.status(200).send(result);
        }
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getLogReceiveSaltByOrdersIdTask = getLogReceiveSaltByOrdersIdTask;
// ------------------------ fish sauce receipt ------------------------
const createFiashSauceBillTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, product_name, weigh_net, price_per_weigh, price_net, customer, date_action, } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.insertRecieveFiashSauceBill)(connection, {
            no,
            product_name,
            weigh_net,
            price_per_weigh,
            price_net,
            customer,
            date_action,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createFiashSauceBillTask = createFiashSauceBillTask;
const getReceiveFiashSauceBillPaginationTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getFiashSauceListReceivePagination)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowFiashSauceListReceive)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveFiashSauceBillPaginationTask = getReceiveFiashSauceBillPaginationTask;
const getReceiveFiashSauceBillPaginationWithOutEmptyTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getFiashSauceListReceivePaginationWithOutEmpty)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
        });
        const countList = yield (0, receive_service_1.getAllRowFiashSauceListReceiveWithOutEmpty)(connection);
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getReceiveFiashSauceBillPaginationWithOutEmptyTask = getReceiveFiashSauceBillPaginationWithOutEmptyTask;
const fillterReceiveFiashSauceTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { no, weigh_net, customer_name, product_name, stock } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.fillterReceiveFiashSauce)(connection, {
            no,
            weigh_net,
            customer_name,
            product_name,
            stock,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.fillterReceiveFiashSauceTask = fillterReceiveFiashSauceTask;
const getLogReceiveFiashSauceByOrdersIdTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.getReceiveFiashSauceByOrderId)(connection, {
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
exports.getLogReceiveFiashSauceByOrdersIdTask = getLogReceiveFiashSauceByOrdersIdTask;
// ------- customer -------
const getCustomerByBillTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type_bill } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.getCustomerByBill)(connection, {
            type_bill: parseInt(type_bill),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getCustomerByBillTask = getCustomerByBillTask;
const getCustomerByBillTaskPaginationTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, offset, type_bill } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const list = yield (0, receive_service_1.getCustomerByBillPagination)(connection, {
            page: parseInt(page),
            offset: parseInt(offset),
            type_bill: parseInt(type_bill),
        });
        const countList = yield (0, receive_service_1.getAllRowCustomerByBill)(connection, {
            type_bill: parseInt(type_bill),
        });
        const responseData = {
            data: list,
            total: countList[0].allRows,
        };
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(responseData);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getCustomerByBillTaskPaginationTask = getCustomerByBillTaskPaginationTask;
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type_bill, name } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.insertCustomer)(connection, {
            type_bill: parseInt(type_bill),
            name: name,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createCustomer = createCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idcustomer_bill = req.params.idcustomer_bill;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, receive_service_1.deleteCustomerBil)(connection, {
            idcustomer_bill: Number(idcustomer_bill),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.deleteCustomer = deleteCustomer;
