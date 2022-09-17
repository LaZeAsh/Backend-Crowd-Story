import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import { mongo } from './database';
import User from "./database/models/user"
import Story from "./database/models/Story";

//Connecting to the DB
mongo();

app.use(express.json());

app.get('/stories', async(req, res) => {  
  const { id } = req.query;
  // /stories?id=whateverthefuck
  if (id){
    // pull one story
  }else{
    // pull all stories
  }
  res.send({ success: true })
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

  res.send({ success: true, payload: story });
});


app.post("/user/create", async (req, res) => {
  const { userName } = req.body;

  const user = await User.create({
    userName,
    participatingStoryIDs: [],
    favouriteStoryIDs: []
  })

  await user.save();

  res.send({ success: true, payload: user });
})


app.listen(process.env.PORT, () => {
  console.log('API Running at http://localhost:' + process.env.PORT )
});


