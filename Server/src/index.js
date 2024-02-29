// import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
// import { PORT } from "./constants.js";
// import dotenv from "dotenv";
// dotenv.config();

const PORT = process.env.PORT || 8000
console.log('process.env.PORT',process.env.PORT)
connectDB()
  .then(() => {
    console.log("RUN index.js than part", process.env.PORT);
    app.listen(PORT, () => {
      console.log("Server is running at PORT", PORT);
    });
  })
  .catch((err) => {
    console.log("RUN index.js catch part");
    console.log("mongodb connaction faild index.js", err);
  });
