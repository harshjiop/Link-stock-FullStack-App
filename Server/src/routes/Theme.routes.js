import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  DeleteTheme,
  GetAllTheme,
  NewThemeCreated,
} from "../controllers/Theme.controllers.js";

const router = Router();

router.use(verifyJWT);

//SECURED ROUTES
router.route("/all-theme").get(GetAllTheme);
router.route("/add-theme").post(NewThemeCreated);
router.route("/delete-theme").post(DeleteTheme);

export default router;
