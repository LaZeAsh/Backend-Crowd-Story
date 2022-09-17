import { Schema, model } from 'mongoose';

interface Line{
  userName: string,
  timestamp: number,
  content: string,
  specialWord?: string,
  thumbnail?: string
}

const StorySchema = new Schema({
  likes: Number,
  title: String,
  lines: {
    type: Array<Line>,
    required: true
  },
  timestamp: Number,
  tags: Array<string>
})

const Story = model("story", StorySchema, "story");

export default Story;