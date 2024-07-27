import mongoose from "mongoose";

export const db = async () => {
  try {
    const link = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db connected succesfully ${link.connection.host}`);
  } catch (error) {
    console.log(`db error connection ${error.message}`);
    process.exit(1);
  }
};
