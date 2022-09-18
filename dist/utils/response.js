"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, payload, success = true, statusCode = 200) => {
    res.send({ success, payload }).status(statusCode);
};
exports.sendResponse = sendResponse;
