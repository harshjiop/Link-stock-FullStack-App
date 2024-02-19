import { Router } from "express";
import { getuser, getuser_All_Product } from "../controllers/getUser.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

//SECURED ROUTES
// router.use(verifyJWT);
router.route("/:username").get(getuser);
router.route("/store/:username").get(getuser_All_Product);
router.route("/:username/Store").get(getuser_All_Product);

export default router;
