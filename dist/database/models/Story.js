"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StorySchema = new mongoose_1.Schema({
    likes: Number,
    title: String,
    lines: {
        type: (Array),
        required: true
    },
    timestamp: Number,
    tags: (Array)
});
var Story = (0, mongoose_1.model)("story", StorySchema, "story");
exports.default = Story;
