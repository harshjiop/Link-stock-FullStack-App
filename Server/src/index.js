import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./constants.js";

dotenv.config({
  path: "../env",
});
connectDB()
  .then(() => {
    // console.log("RUN index.js than part");
    app.listen(PORT, () => {
      console.log("Server is running at PORT", PORT);
    });
  })
  .catch((err) => {
    console.log("RUN index.js catch part");
    console.log("mongodb connaction faild index.js", err);
  });
