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
exports.deleteWorkingStatusService = exports.insertWorkingStatus = exports.getAllWorkingStatus = void 0;
const config_1 = __importDefault(require("config"));
const connect_1 = require("../utils/connect");
const dotenv_1 = __importDefault(require("dotenv"));
const response_1 = __importDefault(require("../utils/response"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const DB = config_1.default.get("database");
const getAllWorkingStatus = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT * FROM  ${DB}.working_status;`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        logger_1.default.error(e);
        throw new Error("bad request");
    }
});
exports.getAllWorkingStatus = getAllWorkingStatus;
const insertWorkingStatus = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, color } = input;
        const sql = `INSERT INTO  ${DB}.working_status (title, color) VALUES ('${title}', '${color}');`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        logger_1.default.error(e);
        throw new Error("bad request");
    }
});
exports.insertWorkingStatus = insertWorkingStatus;
const deleteWorkingStatusService = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idworking_status } = input;
        const sql = `DELETE FROM ${DB}.working_status where idworking_status=${idworking_status};`;
        const result = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, result);
    }
    catch (e) {
        logger_1.default.error(e);
        throw new Error("bad request");
    }
});
exports.deleteWorkingStatusService = deleteWorkingStatusService;
