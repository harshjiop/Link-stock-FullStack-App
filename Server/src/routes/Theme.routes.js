import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  GetAllTheme,
  NewThemeCreated,
} from "../controllers/Theme.controllers.js";

const router = Router();

router.use(verifyJWT);

//SECURED ROUTES
router.route("/all-theme").get(GetAllTheme);
router.route("/add-theme").post(NewThemeCreated);

export default router;
