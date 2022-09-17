import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  participatingStoryIDs: {
    type: Array<String>,
    required: false
  },
  favouriteStoryIDs: {
    type: Array<String>,
    required: false
  }
}, {versionKey: false});

const User = model('user', UserSchema, 'user');

export default User;