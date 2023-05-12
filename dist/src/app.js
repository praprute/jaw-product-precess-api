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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("config"));
const mysql_1 = __importDefault(require("mysql"));
const express_myconnection_1 = __importDefault(require("express-myconnection"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./utils/connect");
const logger_1 = __importDefault(require("./utils/logger"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = config_1.default.get("port");
const Host = config_1.default.get("host");
const app = (0, express_1.default)();
// app.use(helmet());
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json());
// app.use("/api", routes);
app.use((0, express_myconnection_1.default)(mysql_1.default, {
    host: config_1.default.get("host"),
    user: config_1.default.get("user"),
    password: config_1.default.get("password"),
    port: config_1.default.get("port"),
    database: config_1.default.get("database"),
    dateStrings: config_1.default.get("dateStrings"),
    timezone: config_1.default.get("timezone"),
}, "pool"));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`App is running at http://${Host}:${PORT}`);
    yield (0, connect_1.Connect)();
    (0, routes_1.default)(app);
    (0, swagger_1.default)(app, PORT);
}));
