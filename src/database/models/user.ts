import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  // timeStamp: {
  //   type: Number,
  //   required: true
  // },
  participatingStoryIDs: {
    type: Array<String>,
    required: false
  },
  favourtieStoryIDs: {
    type: Array<String>,
    required: false
  }
}, {versionKey: false});

const userModel = model('user', schema, 'user');

export default userModel;