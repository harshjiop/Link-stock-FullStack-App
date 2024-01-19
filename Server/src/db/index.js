import mongoose from "mongoose";
import { DB_NAME, DB_URL } from "../constants.js";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${DB_URL}/${DB_NAME}`);
    console.log(
      `\n MONGODB Connected !!! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection error", error);
    process.exit(1);
  }
};
export default connectDB;
