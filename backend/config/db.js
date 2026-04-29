import mongoose from "mongoose";
const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
export default connectDB;
