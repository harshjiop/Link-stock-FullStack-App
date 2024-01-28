import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  Addlink,
  Deletelink,
  GetAllLink,
  UpdateThumbnail,
  Updatelink,
  isAcctiveLink,
  removeThumbnail,
} from "../controllers/page.controller.js";

const router = Router();

router.use(verifyJWT);

//SECURED ROUTES
router.route("/all-link").get(GetAllLink);
router.route("/delete-link").post(Deletelink);
router.route("/update-link").patch(Updatelink);
router.route("/acctive-link").patch(isAcctiveLink);

router.route("/add-link").post(upload.single("thumbnail"), Addlink);

router
  .route("/thumbnail")
  .patch(upload.single("avatar"), UpdateThumbnail)
  .post(removeThumbnail);
export default router;
