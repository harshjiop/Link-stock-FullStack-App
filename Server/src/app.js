import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
let allowOrigins = [process.env.Cors_Origin, 'http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not Allowed By CORS'));
      }
    }
  })
);


app.use(
  express.json({
    limit: "20kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import PageRouter from "./routes/page.routes.js";
import getUserRoutes from "./routes/getUser.routes.js";
import ThemeRouters from "./routes/Theme.routes.js";
import ProductRouters from "./routes/Product.routes.js";
// import healthcheckRouter from "./routes/healthcheck.routes.js";

//routes declaration
// app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/", getUserRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/link", PageRouter);
app.use("/api/v1/theme", ThemeRouters);
app.use("/api/v1/product", ProductRouters);

export { app };
