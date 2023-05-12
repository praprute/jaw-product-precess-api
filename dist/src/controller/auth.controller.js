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
exports.getUserInfoTask = exports.signInTask = exports.createUserTask = void 0;
const auth_service_1 = require("../service/auth.service");
const connect_1 = require("../utils/connect");
const logger_1 = __importDefault(require("../utils/logger"));
const getUUID_1 = __importDefault(require("../utils/getUUID"));
const createUserTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, phone, name, password, email } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, auth_service_1.insertUser)(connection, {
            role,
            phone,
            name,
            password,
            email,
        });
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createUserTask = createUserTask;
const signInTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, auth_service_1.signInService)(connection, {
            userName,
            password,
        });
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.signInTask = signInTask;
const getUserInfoTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, connect_1.Connect)();
        const getUserId = yield (0, getUUID_1.default)(req.headers.authorization);
        const result = yield (0, auth_service_1.getUserInfo)(connection, getUserId.uuid);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getUserInfoTask = getUserInfoTask;
