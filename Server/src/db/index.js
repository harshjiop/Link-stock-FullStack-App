import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `\n MONGODB Connected !!! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection error", error);
    process.exit(1);
  }
};
export default connectDB;
