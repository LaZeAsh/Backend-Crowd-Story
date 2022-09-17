import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import { mongo } from './database';
import userModel from './database/models/user';

//Connecting to the DB
mongo();

app.use(express.json());

app.get('/stories', async(req, res) => {  
  // let ID = req.body.ID;
  res.send({ success: true })
});

app.post('/story/create', async(req, res) => {
  let name: string = req.body.name;
  // console.log(req.body);
  await (await userModel.create({ name: name })).save();
  await userModel.findOne({ name: name }).then((doc) => {
    if(!doc) return;
    res.send(doc.id);
  })
});

app.get('/story/get', async(req, res) => {

});


// axios.post("", Object)

// Object = {
//   name: ""
//   lines: []

// }

// app.post('/create', async (req, res) => {
  
//   let userID: string = req.body.ID; // userIDs
//   await userModel.create({ })
// });

app.post('/append', async(req, res) => {
  let userID: string = req.body.userID;
  // let name: string = req.body.name;
  // let line: string = req.body.line;
  let array;
  // await userModel.findOne({ name: name }).then((doc) => {
  //   if(!doc) return;
  //   array = doc.lines;
  // })
  //@ts-ignore
  array.append(line);
  await userModel.findOneAndUpdate({ name: name }, { lines: array });
  return true; // Return true only if line appended
});

// app.get('/getlines/:name', async(req, res) => {
//   let name: string = req.body.name;
//   userModel.findOne({ name: name }).then((doc) => {
//     if(!doc) return;
//     return doc.lines; // Returns the lines when given the name
//   })

//   return null; // Null if doc doesn't exist
// })



app.listen(process.env.PORT, () => {
  console.log('API Running')
});


