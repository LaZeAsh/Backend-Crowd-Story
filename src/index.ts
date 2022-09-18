import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
const app = express();
import { mongo } from './database';
import User from "./database/models/user"
import Story from "./database/models/Story";
import { sendResponse } from "./utils/response";
import cors from "cors";

//Connecting to the DB
mongo();

app.use(express.json());
app.use(cors());

app.get('/stories', async (req: Request, res: Response) : Promise<void> => {  
  const { id } = req.query;
  // /stories?id=whateverthefuck
  if (id){
    // pull one story
    try {
      const story = await Story.findById(id);
      sendResponse(res, story);
    } catch (error: any) {
      sendResponse(res, error.message, false, 400);
    }
    // const story = await Story.findById(id);
    // if (!story){
    //   sendResponse(res, "error finding story with id: " + id, false, 404);
    // }
    // sendResponse(res, story);
  }else{
    // pull all stories
    const stories = await Story.find({});
    //console.log(stories);
    if (!stories){
      sendResponse(res, "error finding stories", false, 404);
    }

    sendResponse(res, stories);
  } 
});

app.post('/story/create', async (req: Request, res: Response) : Promise<void> => {
  const { userName, title, lineContent } = req.body;

  const story = await Story.create({
    likes: 0,
    title: title ? title : "",
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
    // user.update({ $push: story._id });
    user.participatingStoryIDs.push(story._id.toString());
    await user.save();
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

app.post("/story/add-line", async (req: Request, res: Response) : Promise<void> => {
  const { userName, lineContent, storyId } = req.body;

  const user = await User.find({ userName });

  if (!user){
    sendResponse(res, "error finding user with username: " + userName, false, 404);
  }

  const story = await Story.findById(storyId);

  if (!story){
    sendResponse(res, "error finding story", false, 404);
  } else {
    story.lines.push({ userName, timestamp: new Date(), content: lineContent })
  
  
    await story.save();

    sendResponse(res, story);
  }
  

})


app.listen(process.env.PORT, () => {
  console.log('API Running at http://localhost:' + process.env.PORT )
});


