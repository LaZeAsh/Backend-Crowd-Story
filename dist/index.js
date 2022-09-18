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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const database_1 = require("./database");
const user_1 = __importDefault(require("./database/models/user"));
const Story_1 = __importDefault(require("./database/models/Story"));
const response_1 = require("./utils/response");
//Connecting to the DB
database_1.mongo();
app.use(express_1.default.json());
app.get('/stories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    // /stories?id=whateverthefuck
    if (id) {
        // pull one story
        const story = yield Story_1.default.findById(id);
        if (!story) {
            response_1.sendResponse(res, "error finding story with id: " + id, false, 404);
        }
        response_1.sendResponse(res, story);
    }
    else {
        // pull all stories
        const stories = yield Story_1.default.find({});
        console.log(stories);
        if (!stories) {
            response_1.sendResponse(res, "error finding stories", false, 404);
        }
        response_1.sendResponse(res, stories);
    }
}));
app.post('/story/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, title, lineContent } = req.body;
    const story = yield Story_1.default.create({
        likes: 0,
        title: title ? title : "",
        lines: [
            {
                userName,
                timestamp: new Date(),
                content: lineContent
            }
        ]
    });
    yield story.save();
    const user = yield user_1.default.findOne({ userName });
    if (!user) {
        res.send({ success: true, message: `user with username: ${userName} not found!` }).status(404);
    }
    else {
        user.update({ $push: story._id });
    }
    response_1.sendResponse(res, story);
    // res.send({ success: true, payload: story });
}));
app.post("/user/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.body;
    const user = yield user_1.default.create({
        userName,
        participatingStoryIDs: [],
        favouriteStoryIDs: []
    });
    yield user.save();
    // res.send({ success: true, payload: user });
    response_1.sendResponse(res, user);
}));
app.post("/story/add-line", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, lineContent, storyId } = req.body;
    const user = yield user_1.default.find({ userName });
    if (!user) {
        response_1.sendResponse(res, "error finding user with username: " + userName, false, 404);
    }
    const story = yield Story_1.default.findById(storyId);
    if (!story) {
        response_1.sendResponse(res, "error finding story", false, 404);
    }
    else {
        story.update({
            lines: {
                $push: {
                    userName,
                    timestamp: new Date(),
                    content: lineContent
                }
            }
        });
        yield story.save();
        response_1.sendResponse(res, story);
    }
}));
app.listen(process.env.PORT, () => {
    console.log('API Running at http://localhost:' + process.env.PORT);
});
