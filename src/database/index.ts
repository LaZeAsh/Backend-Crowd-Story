import mongoose from 'mongoose';

export async function mongo() {
  mongoose.connect(process.env.MONGO_TOKEN as string).then(() => console.log(`MongoDB is connected`));
}

