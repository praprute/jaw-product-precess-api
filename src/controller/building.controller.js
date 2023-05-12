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
exports.updateBuildingTask = exports.deleteBuildingTask = exports.getCountingPuddleFromBuildingTask = exports.getBuildingTask = exports.createBuildingTask = void 0;
const building_service_1 = require("../service/building.service");
const connect_1 = require("../utils/connect");
const logger_1 = __importDefault(require("../utils/logger"));
const createBuildingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, limit_pool } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, building_service_1.insertBuilding)(connection, { name, limit_pool });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createBuildingTask = createBuildingTask;
const getBuildingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, building_service_1.getAllBuilding)(connection);
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getBuildingTask = getBuildingTask;
const getCountingPuddleFromBuildingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { building_id } = req.params;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, building_service_1.getCountingPuddleFromBuilding)(connection, {
            building_id: Number(building_id),
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.getCountingPuddleFromBuildingTask = getCountingPuddleFromBuildingTask;
const deleteBuildingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idbuilding } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, building_service_1.deleteBuilding)(connection, { idbuilding });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.deleteBuildingTask = deleteBuildingTask;
const updateBuildingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idbuilding, name, limit_pool } = req.body;
        const connection = yield (0, connect_1.Connect)();
        const result = yield (0, building_service_1.updateLimitBuilding)(connection, {
            idbuilding,
            name,
            limit_pool,
        });
        yield (0, connect_1.DisConnect)(connection);
        return res.status(200).send(result);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.updateBuildingTask = updateBuildingTask;
