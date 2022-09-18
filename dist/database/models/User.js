"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true
    },
    participatingStoryIDs: {
        type: (Array),
        required: false
    },
    favouriteStoryIDs: {
        type: (Array),
        required: false
    }
}, { versionKey: false });
var User = (0, mongoose_1.model)('user', UserSchema, 'user');
exports.default = User;
