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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var database_1 = require("./database");
var User_1 = __importDefault(require("./database/models/User"));
var Story_1 = __importDefault(require("./database/models/Story"));
var response_1 = require("./utils/response");
//Connecting to the DB
(0, database_1.mongo)();
app.use(express_1.default.json());
app.get('/stories', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, story, stories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                if (!id) return [3 /*break*/, 2];
                return [4 /*yield*/, Story_1.default.findById(id)];
            case 1:
                story = _a.sent();
                if (!story) {
                    (0, response_1.sendResponse)(res, "error finding story with id: " + id, false, 404);
                }
                (0, response_1.sendResponse)(res, story);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, Story_1.default.find({})];
            case 3:
                stories = _a.sent();
                console.log(stories);
                if (!stories) {
                    (0, response_1.sendResponse)(res, "error finding stories", false, 404);
                }
                (0, response_1.sendResponse)(res, stories);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/story/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, title, lineContent, story, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userName = _a.userName, title = _a.title, lineContent = _a.lineContent;
                return [4 /*yield*/, Story_1.default.create({
                        likes: 0,
                        title: title ? title : "",
                        lines: [
                            {
                                userName: userName,
                                timestamp: new Date(),
                                content: lineContent
                            }
                        ]
                    })];
            case 1:
                story = _b.sent();
                return [4 /*yield*/, story.save()];
            case 2:
                _b.sent();
                return [4 /*yield*/, User_1.default.findOne({ userName: userName })];
            case 3:
                user = _b.sent();
                if (!user) {
                    res.send({ success: true, message: "user with username: ".concat(userName, " not found!") }).status(404);
                }
                else {
                    user.update({ $push: story._id });
                }
                (0, response_1.sendResponse)(res, story);
                return [2 /*return*/];
        }
    });
}); });
app.post("/user/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userName = req.body.userName;
                return [4 /*yield*/, User_1.default.create({
                        userName: userName,
                        participatingStoryIDs: [],
                        favouriteStoryIDs: []
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                // res.send({ success: true, payload: user });
                (0, response_1.sendResponse)(res, user);
                return [2 /*return*/];
        }
    });
}); });
app.post("/story/add-line", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, lineContent, storyId, user, story;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userName = _a.userName, lineContent = _a.lineContent, storyId = _a.storyId;
                return [4 /*yield*/, User_1.default.find({ userName: userName })];
            case 1:
                user = _b.sent();
                if (!user) {
                    (0, response_1.sendResponse)(res, "error finding user with username: " + userName, false, 404);
                }
                return [4 /*yield*/, Story_1.default.findById(storyId)];
            case 2:
                story = _b.sent();
                if (!!story) return [3 /*break*/, 3];
                (0, response_1.sendResponse)(res, "error finding story", false, 404);
                return [3 /*break*/, 5];
            case 3:
                story.update({
                    lines: {
                        $push: {
                            userName: userName,
                            timestamp: new Date(),
                            content: lineContent
                        }
                    }
                });
                return [4 /*yield*/, story.save()];
            case 4:
                _b.sent();
                (0, response_1.sendResponse)(res, story);
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(process.env.PORT, function () {
    console.log('API Running at http://localhost:' + process.env.PORT);
});
