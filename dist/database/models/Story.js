"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LineSchema = new mongoose_1.Schema({
    userName: String,
    timestamp: Number,
    content: String,
    specialWord: { type: String, required: false },
    thumbnail: { type: String, required: false }
});
const StorySchema = new mongoose_1.Schema({
    likes: { type: Number },
    title: { type: String },
    lines: {
        type: [LineSchema],
        required: true
    },
    timestamp: Number,
    tags: [String]
});
const Story = mongoose_1.model("story", StorySchema, "story");
exports.default = Story;
