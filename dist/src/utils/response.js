"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resp = (success, message, message_en, message_th) => {
    return {
        success: success ? "success" : "error",
        message: message,
        message_en: message_en,
        message_th: message_th,
    };
};
exports.default = resp;
