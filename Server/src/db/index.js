import mongoose from "mongoose";
import { DB_NAME, DB_URL } from "../constants.js";
// const DB_URL = process.env.DB_URLS;
const connectDB = async () => {
  // console.log("dburl", DB_URL);
  // console.log("Ports", process.env.PORTSS);
  // console.log("direct env", process.env.DB_URLS);
  // console.log(DB_URL);
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
