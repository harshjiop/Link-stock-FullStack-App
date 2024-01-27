import { Router } from "express";
import { getuser } from "../controllers/getUser.controllers.js";

const router = Router();

//SECURED ROUTES

router.route("/:username").get(getuser);

export default router;
