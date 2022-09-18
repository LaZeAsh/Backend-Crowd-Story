"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true
    },
    participatingStoryIDs: {
        type: [String],
        required: false
    },
    favouriteStoryIDs: {
        type: [String],
        required: false
    }
}, { versionKey: false });
const User = (0, mongoose_1.model)('user', UserSchema, 'user');
exports.default = User;
