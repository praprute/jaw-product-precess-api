"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const bearerHeader = req.body.token || req.query.token || req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).send({
            success: "ERROR",
            message: "A token is required for authentication",
        });
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_JWT);
    }
    catch (err) {
        return res.status(401).send({
            success: "ERROR",
            message: "Invalid Token",
        });
    }
    return next();
};
exports.default = verifyToken;
