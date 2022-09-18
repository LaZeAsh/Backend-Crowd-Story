"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
var sendResponse = function (res, payload, success, statusCode) {
    if (success === void 0) { success = true; }
    if (statusCode === void 0) { statusCode = 200; }
    res.send({ success: success, payload: payload }).status(statusCode);
};
exports.sendResponse = sendResponse;
