"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: 1337,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT,
    dateStrings: true,
    ssl_mode: "REQUIRED",
    dialect: "mysql",
    logging: true,
    force: true,
    timezone: "+07:00",
    secret_jwt: process.env.SECRET_JWT,
};
