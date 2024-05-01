import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  AddProduct,
  DeleteProduct,
  GetAllProduct,
  UpdateProduct,
  GetProductById,
} from "../controllers/Product.controllers.js";

const router = Router();

router.use(verifyJWT);
// router.use(UserVerified);

//SECURED ROUTES
router.route("/all-product").get(GetAllProduct);
router
  .route("/update-product/:productid")
  .patch(upload.array("new_product_img", 5), UpdateProduct);
// router.route("/update-product/").patch(UpdateProduct);
router.route("/delete-product/:productid").delete(DeleteProduct);

router.route("/:id").get(GetProductById);

router.route("/add-product").post(upload.array("Product_img", 5), AddProduct);

// router
//   .route("/thumbnail")
//   .patch(upload.single("avatar"), UpdateThumbnail)
//   .post(removeThumbnail);
export default router;
