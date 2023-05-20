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
exports.getUserInfo = exports.signInService = exports.insertUser = void 0;
const config_1 = __importDefault(require("config"));
const connect_1 = require("../utils/connect");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const response_1 = __importDefault(require("../utils/response"));
// import expressJwt from "express-jwt";
dotenv_1.default.config();
const DB = config_1.default.get("database");
const insertUser = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, phone, name, password, email } = input;
        const sqlCheckPhoneUser = `SELECT * FROM ${DB}.users where phone = '${phone}';`;
        const sqlCheckEmailUser = `SELECT * FROM ${DB}.users where email = '${email}';`;
        const checkDuplicatePhone = yield (0, connect_1.Query)(connection, sqlCheckPhoneUser);
        const checkDuplicateEmail = yield (0, connect_1.Query)(connection, sqlCheckEmailUser);
        if (checkDuplicatePhone.length > 0 || checkDuplicateEmail.length > 0) {
            return "DULICATE_USER";
        }
        else {
            const passwordHash = bcrypt_1.default.hashSync(password, 10);
            let queryInsert = `INSERT INTO ${DB}.users (uuid, role, phone, name, password, email) 
        values (UUID(), '${role ? role : 0}','${phone}','${name}','${passwordHash}', '${email}') ;`;
            const data = yield (0, connect_1.Query)(connection, queryInsert);
            if (data) {
                return (0, response_1.default)(true, "CREATE_USER_SUCCESS");
            }
            else {
                return (0, response_1.default)(false, "CRASH");
            }
        }
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.insertUser = insertUser;
const signInService = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = input;
        const sql = `SELECT * FROM ${DB}.users where phone = '${userName}' OR email = '${userName}';`;
        const data = yield (0, connect_1.Query)(connection, sql);
        if (data.length > 0) {
            const isCorrect = bcrypt_1.default.compareSync(password, data[0].password);
            if (isCorrect) {
                const token = jsonwebtoken_1.default.sign({
                    idusers: data[0].idusers,
                    uuid: data[0].uuid,
                    phone: data[0].phone,
                    role: data[0].role,
                    iat: Math.floor(new Date() / 1000),
                }, process.env.SECRET_JWT);
                return (0, response_1.default)(true, {
                    idusers: data[0].idusers,
                    uuid: data[0].uuid,
                    phone: data[0].phone,
                    role: data[0].role,
                    token: token,
                });
            }
            else {
                return (0, response_1.default)(false, "PASSWORD_DONT_MATCH");
            }
        }
        else {
            return (0, response_1.default)(false, "DONT_FIND_USER");
        }
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.signInService = signInService;
const getUserInfo = (connection, input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sql = `SELECT * FROM ${DB}.users where uuid = '${input}';`;
        const data = yield (0, connect_1.Query)(connection, sql);
        return (0, response_1.default)(true, data);
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getUserInfo = getUserInfo;
