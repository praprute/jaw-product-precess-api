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
exports.getAllLaborPriceFerment = exports.getAllLaborPricePerBuildingByBuilding = exports.getAllLaborPricePerBuilding = exports.updateLaborPriceFerment = exports.updateLaborPricePerBuilding = exports.insertLaborPriceFerment = exports.insertLaborPricePerBuilding = void 0;
const config_1 = __importDefault(require("config"));
const connect_1 = require("../utils/connect");
const dotenv_1 = __importDefault(require("dotenv"));
const response_1 = __importDefault(require("../utils/response"));
dotenv_1.default.config();
const DB = config_1.default.get("database");
const insertLaborPricePerBuilding = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id, price } = input;
        const sql = `INSERT INTO ${DB}.labor_price_per_building ( building, price ) 
    values ( ${building_id},  ${price} );`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.insertLaborPricePerBuilding = insertLaborPricePerBuilding;
const insertLaborPriceFerment = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price } = input;
        const sql = `INSERT INTO ${DB}.labor_price_ferment ( price ) 
    values ( ${price} );`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.insertLaborPriceFerment = insertLaborPriceFerment;
const updateLaborPricePerBuilding = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_price, price } = input;
        const sql = `UPDATE ${DB}.labor_price_per_building SET price = ${price}  where idlabor_price_per_building = ${id_price} ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.updateLaborPricePerBuilding = updateLaborPricePerBuilding;
const updateLaborPriceFerment = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_price, price } = input;
        const sql = `UPDATE ${DB}.labor_price_ferment SET price = ${price}  where idlabor_price_ferment = ${id_price} ;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.updateLaborPriceFerment = updateLaborPriceFerment;
const getAllLaborPricePerBuilding = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT * FROM ${DB}.labor_price_per_building inner join (select idbuilding, name from ${DB}.building) BuildingTable on labor_price_per_building.building = BuildingTable.idbuilding;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.getAllLaborPricePerBuilding = getAllLaborPricePerBuilding;
const getAllLaborPricePerBuildingByBuilding = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_building } = input;
        const sql = `SELECT * FROM ${DB}.labor_price_per_building where building=${id_building};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.getAllLaborPricePerBuildingByBuilding = getAllLaborPricePerBuildingByBuilding;
const getAllLaborPriceFerment = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT * FROM ${DB}.labor_price_ferment;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(`bad insert : ${e}`);
    }
});
exports.getAllLaborPriceFerment = getAllLaborPriceFerment;
// UPDATE ${DB}.fishsauce_receipt SET stock = stock-${new_stock} WHERE idfishsauce_receipt = ${idreceipt};
