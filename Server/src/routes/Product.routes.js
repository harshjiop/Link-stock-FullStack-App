import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  AddProduct,
  DeleteProduct,
  GetAllProduct,
  UpdateProduct,
} from "../controllers/Product.controllers.js";

const router = Router();

router.use(verifyJWT);

//SECURED ROUTES
router.route("/all-product").get(GetAllProduct);
router.route("/update-product").patch(UpdateProduct);
router.route("/delete-product").delete(DeleteProduct);

router.route("/add-product").post(
  upload.array('Product_img',5),
  AddProduct
);

// router
//   .route("/thumbnail")
//   .patch(upload.single("avatar"), UpdateThumbnail)
//   .post(removeThumbnail);
export default router;
