import { Schema, model } from 'mongoose';

interface Line{
  userName: string,
  timestamp: number,
  content: string,
  specialWord?: string,
  thumbnail?: string
}

const LineSchema = new Schema({
  userName: String,
  timestamp: Number,
  content: String,
  specialWord: { type: String, required: false },
  thumbnail: { type: String, required: false }
})

const StorySchema = new Schema({
  likes: { type: Number },
  title: { type: String },
  lines: {
    type: [LineSchema],
    required: true
  },
  timestamp: Number,
  tags: [String]
})

const Story = model("story", StorySchema, "story");

export default Story;