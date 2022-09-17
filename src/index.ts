import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
const app = express();
import { mongo } from './database';
import User from "./database/models/User"
import Story from "./database/models/Story";
import { sendResponse } from "./utils/response";

//Connecting to the DB
mongo();

app.use(express.json());

app.get('/stories', async(req: Request, res: Response) : Promise<void> => {  
  const { id } = req.query;
  // /stories?id=whateverthefuck
  if (id){
    // pull one story
    const story = await Story.findById(id);
    if (!story){
      sendResponse(res, "error finding story with id: " + id, false, 404);
    }
    sendResponse(res, story);
  }else{
    // pull all stories
    const stories = await Story.find({});
    console.log(stories);
    if (!stories){
      sendResponse(res, "error finding stories", false, 404);
    }

    sendResponse(res, stories);
  }
  //res.send({ success: true })
});

app.post('/story/create', async(req, res) => {
  const { userName, title, lineContent } = req.body;

  const story = await Story.create({
    likes: 0,
    title,
    lines: [
      {
        userName,
        timestamp: new Date(),
        content: lineContent
      }
    ]
  })

  await story.save();

  const user = await User.findOne({ userName });

  if (!user){
    res.send({ success: true, message: `user with username: ${userName} not found!` }).status(404);
  } else {
    user.update({ $push: story._id });
  }

  sendResponse(res, story);
  // res.send({ success: true, payload: story });
});


app.post("/user/create", async (req, res) => {
  const { userName } = req.body;

  const user = await User.create({
    userName,
    participatingStoryIDs: [],
    favouriteStoryIDs: []
  })

  await user.save();

  // res.send({ success: true, payload: user });
  sendResponse(res, user);
})


app.listen(process.env.PORT, () => {
  console.log('API Running at http://localhost:' + process.env.PORT )
});


