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
exports.getAllFeeLaborFerment = exports.getFeeLaborPerBuildingByBuilding = exports.getAllFeeLaborPerBuilding = exports.updateFeeLaborFerment = exports.updateFeeLaborPerBuilding = exports.createFeeLaborFerMent = exports.createFeeLaborPerBuilding = void 0;
const fee_service_1 = require("../service/fee.service");
const connect_1 = require("../utils/connect");
const logger_1 = __importDefault(require("../utils/logger"));
const createFeeLaborPerBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id, price } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, fee_service_1.insertLaborPricePerBuilding)(connection, {
            building_id,
            price,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createFeeLaborPerBuilding = createFeeLaborPerBuilding;
const createFeeLaborFerMent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, fee_service_1.insertLaborPriceFerment)(connection, {
            price,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createFeeLaborFerMent = createFeeLaborFerMent;
const updateFeeLaborPerBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_price, price } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, fee_service_1.updateLaborPricePerBuilding)(connection, {
            id_price,
            price,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateFeeLaborPerBuilding = updateFeeLaborPerBuilding;
const updateFeeLaborFerment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_price, price } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, fee_service_1.updateLaborPriceFerment)(connection, {
            id_price,
            price,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateFeeLaborFerment = updateFeeLaborFerment;
const getAllFeeLaborPerBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, fee_service_1.getAllLaborPricePerBuilding)(connection);
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getAllFeeLaborPerBuilding = getAllFeeLaborPerBuilding;
const getFeeLaborPerBuildingByBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_building } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, fee_service_1.getAllLaborPricePerBuildingByBuilding)(connection, {
            id_building: Number(id_building),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getFeeLaborPerBuildingByBuilding = getFeeLaborPerBuildingByBuilding;
const getAllFeeLaborFerment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, fee_service_1.getAllLaborPriceFerment)(connection);
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getAllFeeLaborFerment = getAllFeeLaborFerment;
