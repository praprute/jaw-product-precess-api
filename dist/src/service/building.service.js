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
exports.updateWorkingStatusPuddle = exports.updateLimitBuilding = exports.deleteBuilding = exports.getCountingPuddleFromBuilding = exports.getAllBuilding = exports.insertBuilding = void 0;
const config_1 = __importDefault(require("config"));
const connect_1 = require("../utils/connect");
const dotenv_1 = __importDefault(require("dotenv"));
const response_1 = __importDefault(require("../utils/response"));
dotenv_1.default.config();
const DB = config_1.default.get("database");
const insertBuilding = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, limit_pool } = input;
        const sql = `INSERT INTO ${DB}.building (name , limit_pool) values ('${name}' , ${limit_pool}) ; `;
        const result = yield (0, connect_1.Query)(connection, sql);
        if (result.insertId) {
            return (0, response_1.default)(true, "CREATE_SUCCESS");
        }
        else {
            return (0, response_1.default)(false, "APP_CRASH");
        }
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.insertBuilding = insertBuilding;
const getAllBuilding = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT * FROM ${DB}.building; `;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getAllBuilding = getAllBuilding;
const getCountingPuddleFromBuilding = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id } = input;
        const sql = `SELECT count(*) as puddle FROM ${DB}.puddle where building_id=${building_id};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result[0]);
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getCountingPuddleFromBuilding = getCountingPuddleFromBuilding;
const deleteBuilding = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idbuilding } = input;
        const sql = `DELETE FROM ${DB}.building WHERE idbuilding=${idbuilding} ; `;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.deleteBuilding = deleteBuilding;
const updateLimitBuilding = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, idbuilding, limit_pool } = input;
        const sql = `UPDATE ${DB}.building SET name = '${name}', limit_pool=${limit_pool} WHERE idbuilding=${idbuilding} ; `;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, "UPDATE_SUCCESS");
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.updateLimitBuilding = updateLimitBuilding;
const updateWorkingStatusPuddle = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { puddle_id, working_status } = input;
        const sql = `UPDATE ${DB}.puddle SET working_status = ${working_status} , update_time= now() WHERE idpuddle=${puddle_id} ; `;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, "UPDATE_SUCCESS");
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.updateWorkingStatusPuddle = updateWorkingStatusPuddle;
