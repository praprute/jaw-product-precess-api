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
exports.deleteWorkingStatus = exports.createWorkingStatus = exports.getListWorkingStatus = void 0;
const setting_service_1 = require("../service/setting.service");
const connect_1 = require("../utils/connect");
const logger_1 = __importDefault(require("../utils/logger"));
const getListWorkingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, setting_service_1.getAllWorkingStatus)(connection);
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getListWorkingStatus = getListWorkingStatus;
const createWorkingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, color } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, setting_service_1.insertWorkingStatus)(connection, { title, color });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createWorkingStatus = createWorkingStatus;
const deleteWorkingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idworking_status = req.params.idworking_status;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, setting_service_1.deleteWorkingStatusService)(connection, {
            idworking_status: Number(idworking_status),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.deleteWorkingStatus = deleteWorkingStatus;
