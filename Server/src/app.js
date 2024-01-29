import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import { Cors_Origin } from "./constants.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: Cors_Origin,
    credentials: true,
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
// import healthcheckRouter from "./routes/healthcheck.routes.js";

//routes declaration
// app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/link", PageRouter);
app.use("/api/v1/theme", ThemeRouters);
app.use("/", getUserRoutes);

export { app };
