import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  participatingStoryIDs: {
    type: [String],
    required: false
  },
  favouriteStoryIDs: {
    type: [String],
    required: false
  }
}, {versionKey: false});

const User = model('user', UserSchema, 'user');

export default User;