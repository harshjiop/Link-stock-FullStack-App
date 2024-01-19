import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  Addlink,
  Deletelink,
  PageProfileUpdate,
  Updatelink,
} from "../controllers/page.controller.js";

const router = Router();

router.use(verifyJWT);

//SECURED ROUTES
router.route("/add-link").post(Addlink);
router.route("/page-profile").patch(PageProfileUpdate);
router.route("/update-link").patch(Updatelink);
router.route("delete-link").post(Deletelink);

export default router;
